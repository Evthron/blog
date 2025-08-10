---
title: "hugo-theme-stack"
description: 
date: 2025-08-10T15:03:23+08:00
lastmod: 2025-08-10T15:03:23+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

# search.tsx
## Typescript
- interface
    - define data structure
- class
- declare
    - state that an variable exists, tell the complier not to throw error

## URL
Get current path (e.g. /zh/posts) by `window.location`
use URL interface to modify the URL
```
const pageURL = new URL(window.location.toString());
```
## URLSearchParams

URL.searchParams is a URLSearchParams object
```
pageURL.searchParams.delete('keyword')
pageURL.searchParams.set('keyword', keywords);
pageURL.searchParams.get('keyword');
```
## array query
If the search parameter is an array, repeat the key for each value in the array. e.g. tag=maths&tag=music
Set Params
```
pageURL.searchParams.delete('tag')
pageURL.searchParams.append('tag', 'maths')
pageURL.searchParams.append('tag', 'maths')
```
Get Params
```
pageURL.searchParams.getAll('tag');
```
