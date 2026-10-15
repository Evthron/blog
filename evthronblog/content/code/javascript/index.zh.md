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

2026-07-27

# Date

Although it's considered outdated , the support for the modern temporal class is just getting supported in browsers , so it's better learn it.

## month index 
month starts from zero , ends at eleven

### GMT
Greenwich mean time (= UTC+0)

## timezone handling 
Z in the time stamp means Zero.
When passing an ISO date string to date constructor:
- if there is no ending Z, treated as local time
- if there is an ending Z , treated as GMT time.
- if only the date is given , treated a GMT time midnight . 

```
> new Date("2026-07-27T08:00:00")
2026-07-27T00:00:00.000Z
> new Date("2026-07-27T08:00:00Z")
2026-07-27T08:00:00.000Z
> new Date("2026-07-27")
2026-07-27T00:00:00.000Z
```


# Map
const fileMap = new Map()

## Map.set
fileMap.set(A, B)

- Adds a new entry with a specified key and value to this Map, or updates an existing entry

## Map.has
check if certain key exists in
***
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set

# Math
Math.max(...extractedPages)

max of a empty list returns -Infinity

2026-07-27
# String

## String to number

parseInt: get the first number string it saw , discard the remaining.
If the first character is not a number , return NaN.


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

2026-08-09

# null, undefined and {}

Null should only be used to represent a empty field 

Undefined should be used as return value when the search result is empty 

Empty object should not be used as return value 

Accessing the properties of a empty object gives undefined without throwing error , which may seem convenient because evaluating undefined yields false in conditional checking , but usually we need to access more then one layers and accessing the properties of undefined gives error , so you have to check anyway .

example : .get() returns undefined when no match 
https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#getbindparameters---row

# JavaScript object

## Find length
object.entries().length ?


## JObject vs JSON
Unlike JSON, in JS, we don't need to wrap object keys in double quotes.

```javascript
{ "fruits": 3 }
```
```json
{ fruits: 3 }
```

### Promise
`async` works exactly like Haskell's do-notaiton, turning chained function call into imperative code.

Imperative code can be represented as chained function, alternatively, we can make chained functions look like imperative code

```
result = await loadingTask()
{...}

```
is the syntactic sugar of
```
let promise = loadingTask()
loadingTask.promise.then( (pdf) => {...} )
```
All the code after the await statement is actually wrapping in a nested function.

***
The example of pdf js still use the old promise syntax, we can translate that to the modern async syntax.

https://mozilla.github.io/pdf.js/examples/
```
var loadingTask = pdfjsLib.getDocument({ url: "helloworld.pdf" });
loadingTask.promise.then(function(pdf) {
  // you can now use *pdf* here
});
```

```
let pdf = await pdfjsLib.getDocument({ url: "helloworld.pdf" }).promise;
// you can now use *pdf* here
```

***

A try-catch block cannot catch errors from a async function with await keyword

```javascript
const {default: fs} = await import('node:fs/promises')
try { fs.readFile('') } catch (error) {}
Uncaught Error: ENOENT: no such file or directory, open ''
```

## Promise
`async` 的原理和 Haskell 的 do-notion 完全一樣，都是把鏈式函數變成更容易理解的指令式代碼。
