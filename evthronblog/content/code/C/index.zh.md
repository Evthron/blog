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

# malloc
Array defined in a function as local variables and will be deallocated once the function returns.
use malloc instead, return the pointer

## Use it before strcpy
Before copying to a a new string, allocate the memory for the string first.

## malloc for string
When trying to use `malloc` to assign memory to a string array, do not use the square-bracket syntax (`char string[]`), use the astrisk form (`char * string`)to indicate that this is a character pointer.

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

