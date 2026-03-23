---
title: "localhost bug"
description: 
date: 2025-01-21T10:12:43+08:00
lastmod: 2025-01-21T09:37:58+08:00
image: 
categories: tweet
tags: []
math: true
license: 
hidden: false
comments: true
---

# Localhost bug
不知道為什麼，有些時候我寫的 git push 會直接把 hugo 用來預覽的 localhost 版本發佈到網上去，使得網站無法瀏覽。

用 -renderToMemory 解決問題，測試的時候不會覆蓋文件。