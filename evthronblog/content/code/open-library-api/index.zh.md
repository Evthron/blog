---
title: "open-library-api"
description: 
date: 2025-01-18T23:15:55+08:00
lastmod: 2025-01-18T23:15:55+08:00
image: 
categories: 
tags: 
math: 
license: 
hidden: false
comments: true
---

https://openlibrary.org/dev/docs/api/covers
```javascript
async function fetchImage(url) {
    const img = new Image();
    return new Promise((res, rej) => {
        img.onload = () => res(img);
        img.onerror = e => rej(e);
        img.src = url;
    });
}
const img = await fetchImage('https://covers.openlibrary.org/b/id/12547191-L.jpg');
const w = img.width;
const h = img.height;
```
