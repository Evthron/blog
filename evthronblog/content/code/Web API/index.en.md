---
title: "Web API"
description: 
date: 2026-01-06T17:44:07+08:00
lastmod: 2026-01-06T17:44:07+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

## Custom attribute
HTML element are all just javascript objects, we can add custom attributes on it if needed.

The convention is to add 'data-' prefix on the attribute name.

```
let tagButtonsContainer = document.getElementsByClassName("tagSearch-tags");
tagButtonsContainer.searchTags = [];
```
