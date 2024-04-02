---
title: "準確的色環"
description: 
date: 2024-01-29T05:05:42+08:00
lastmod: 2024-04-03T01:35:59+08:00
image: accurate-colour-wheel.png
categories: gallery
tags: []
math: 
license: 
hidden: false
comments: true
---

用 [OKLCH 顏色選擇器](https://oklch.com) 做了個符合人眼認知的色環。所有的顏色都有相同的明度和飽和度，色度的間隔也是均勻的。因為色環都是用最高飽和度的純顏料製作的，所以選擇 Chroma = 0.12，是在 sRGB 空間中不存在顏色斷層的最高數值。亮度限在了71到76之間，選了75。
![oklch-colour-wheel](accurate-colour-wheel.png)

