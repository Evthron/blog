---
title: "函數式編程的殘酷真相"
description: 
date: 2026-03-23T22:43:57+08:00
lastmod: 2026-03-23T22:43:49+08:00
image: 
categories: posts
tags: ['coding']
math: true
license: 
hidden: false
comments: true
---

Haskell 是函數式語言。看似鼓勵使用遞歸，實際卻沒有辦法優化遞歸，例如計算斐波那契數列：
```haskell
fibonacci :: Int -> Int
fibonacci 0 = 0
fibonacci 1 = 1
fibonacci x = fibonacci (x-1) + fibonacci (x-2)
```
多麼數學，多麼優美！什麼？你説時間複雜度是 O(2^n) ？我當然知道了，但 Haskell 的編譯器總有辦法幫我搞定的吧？

結果沒有，都用不着試很大的數字，`fibonacci 40` 已經明顯很慢了。明明只是簡單的累加。

是我太天真了，居然期望函數語言能自動優化算法。如果只要寫出漂亮的遞歸式子就能解決問題的話，大家都不用學算法了。

```haskell
fibs = 0 : 1 : zipWith (+) fibs (tail fibs)
-- https://wiki.haskell.org/The_Fibonacci_sequence
```
這是好的解法，是把所有數字都記下來，但是這不就是動態規劃嗎？和函數式一點關係都沒有。

能不能優美地表達遞歸，和實際上能不能用遞歸，完全是兩回事。

***
函數式編程是終極地實踐「過早優化是萬惡之源」。拒絕一切讓編程變得更脫離理論的優化。編譯器優化的上限就是程序的上限。
