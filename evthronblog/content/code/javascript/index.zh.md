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

# Javascript object vs JSON
Unlike JSON, in JS, we don't need to wrap object keys in double quotes.
