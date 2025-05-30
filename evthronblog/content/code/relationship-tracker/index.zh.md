---
title: "relationship-tracker"
description: 
date: 2025-05-30T20:50:23+08:00
lastmod: 2025-05-30T20:50:23+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

## Syntax
- var Mode by remember {mutableStateOf("")}
## Compose
- Surface
    - Theme
    - modifier
- Scaffold
    - topBar
    - botttomBar
    - padding -> send the padding to child objects
- on
    - onDismiss
    - onClick
    - LaunchEffect
## ViewModel
    - interact with database
    - factory
    - \<T: Viewmodel\> create(MainViewModel::class.java)

## Room Database
    - Entity
    - data class
    - enum class
    - Data access object (dao)
