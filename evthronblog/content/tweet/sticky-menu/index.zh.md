---
title: "黏在旁邊的選單"
description: 
date: 2024-06-25T02:01:20+08:00
lastmod: 2024-07-01T05:24:50+08:00
image: 
categories: tweet
tags: ['grumble']
math: true
license: 
hidden: false
comments: true
---

我只是想做個能黏在網頁旁邊的選單而已，為什麼會這麼難？就算參考了我自己的網站模板，做出來的還是只能黏一半不黏一半。難道 position: sticky 是個很複雜的玩意嗎？

2024/06/25 03:44
問題解決了…… 關鍵是 max-height 要等於 100vh 減 top-padding 減 bottom-padding。

