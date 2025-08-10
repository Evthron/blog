---
title: "javascript"
description: 
date: 2025-03-07T14:39:56+08:00
lastmod: 2025-03-07T14:39:56+08:00
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
- No need to check whether array is undefind anymore, just use null conditional operator.
```javascript
if (array !=== undefined && array.length != 0){}
```
```javascript
if (array?.length){}
```

## forEach
```javascript
array.forEach( () => {} )
```
## filter
```javascript
array.filter( () => {} )
```

## Check whether an array contains all the elements in another array (tag check)
```javascript
required_tags = ['A', 'B']
doc_tags = ['A', 'B', 'C']

if (requried_tags.every((tag) => doc_tags.includes(tag)))

```
