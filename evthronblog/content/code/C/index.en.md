---
title: "C"
description: 
date: 2025-09-18T13:27:40+08:00
lastmod: 2025-09-18T13:27:40+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

# Swapping pointers
Although the pointer's address is shared among functions, the pointer variable itself is still passed by value. When a function receives a pointer variable, its changes on the pointer variable doesn't reflect on the pointer variable in the originial function. The function can only go to the pointer's address and change the data there.

This means, you cannot swap pointer variables in a separete function. To mimic pointer swapping, you need to add one more layer of pointer.the pointer passed to the function should store another pointer pointing to the actual data. To update the value of the pointer, you just update the address of the pointer.

Since one more layer of reference is added, one more layer of dereferencing is needed to get the actual value.


# malloc
If you define an array inside a function, it's only stored as a local variableson on the stack. Once the function returns, the array is deallocated. You can no longer have access to that memory adderss.

If you want to pass or return the array to another functions, you need to assign a memory location to to array using `malloc`. `malloc` register a patch of memory and returns the registerd memory address to your pointer. By passing your pointer to other functions, other functions can now have access to that memory address.

## Use it before strcpy
Before copying to a a new string, allocate the memory for the string first. strcpy doesn't alloctate the memory for you.

## malloc for string
When assigning a string array, don't use the square-bracket syntax (`char string[]`). Use the astrisk form (`char * string`) to indicate that this is a character pointer.



# pointer dereferencing

the asterisk pointer means the same thing, which is doing operation to the actual value located at the address which the pointer is pointing to.

If the asterisk is on the right-hand side of the equal sign, it is dereferencing, which is returns the value of the pointer's address.
```C
int value = *ptr
```

If the asterisk pointer is on the left-hand side, it means writing to the value of the address.
```C
*ptr = 5
```

One is getting the value at the address and the other one is assigning value to the address. Their meanings are slightly different.


# How to read arguments

`int main(int argc, char* argv[])`

`int main(int argc, char** argv)`

These two are equivalent, pointer to a char array = pointer to a pointer of a char

`argc`: number of arguments

`argv`: pointer to the first place of the array (= string array)
 
`char *const argv[]`

a pointer to an array of char, the content in the char array is mutable - wrong!

a constant pointer to a array of char - correct!

`:const char* arg`

a constant pointer to an array of char - wrong!

a pointer to a array of constant char - correct!

