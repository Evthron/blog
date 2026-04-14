---
title: "javascript"
description: 
date: 2025-08-10T18:41:48+08:00
lastmod: 2025-08-10T18:41:48+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

# Array
## Check whether array empty
```javascript
if (array !=== undefined && array.length != 0){}
```
- Or, no need to check whether array is undefined, just use null conditional operator.
```javascript
if (array?.length){}
```

# {} vs no {}
When using {} inside functional statements, we need to explicitly return value, otherwise the assigned value will be undefined.

array.filter( () => {if (r > 3) return true else false } )
vs
array.filter( (r) => r > 3 )

## forEach
```javascript
array.forEach( () => {} )
```
## filter
remove element that fits the criteria marked in {}
```javascript
array.filter( () => {} )
```

## Check whether an array contains all the elements in another array (tag check)
```javascript
required_tags = ['A', 'B']
doc_tags = ['A', 'B', 'C']

if (requried_tags.every((tag) => doc_tags.includes(tag)))

```

## sort
return negative value if a comes before b
```javascript
array.sort((a, b) => {
    return a - b
}
```
## map
`return` can be omitted when returning a simple value.

When returning an object, you need to add an extra pair of brackets
```javascript
.map( (f) => ({}) )
```

In curly braces, you must explicitly return something



# event listener
get the element from the event

(e) => {e.target}

## Event delagtion
- don't add the event listener to all the child element
- bubble up and handle in the parent element

# Query selector
`getElementByClassName` returns a `HTMLElementCollection`.

If you want to use array methods like `forEach` on a `HTMLElementCollection`, you have to convert it to array by `Array.from()`

# JavaScript object

## Find length
object.entries().length ?


## vs JSON
Unlike JSON, in JS, we don't need to wrap object keys in double quotes.
