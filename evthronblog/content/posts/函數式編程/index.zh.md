---
title: "函數式編程"
description: 
date: 2026-06-11T02:38:48+08:00
lastmod: 2026-06-11T02:46:55+08:00
image: 
categories: posts
tags: ['coding']
math: true
license: 
hidden: false
comments: true
---

Haskell 是函數式語言，特色是使用遞歸就能一招鮮解決所有問題。但是算法課的老師一般都不會喜歡這种答案，例如計算斐波那契數列：

```haskell
fibonacci :: Int -> Int
fibonacci 0 = 0
fibonacci 1 = 1
fibonacci x = fibonacci (x-1) + fibonacci (x-2)
```
看！和數學式子一模一樣簡單。什麼？你説時間複雜度是 O(2^n) ？但 Haskell 的編譯器總有辦法幫我搞定的吧？

結果沒有，都用不着試很大的數字，`fibonacci 40` 明顯已經很慢了。明明只是簡單的累加而已。

```haskell
fibs = 0 : 1 : zipWith (+) fibs (tail fibs)
-- https://wiki.haskell.org/The_Fibonacci_sequence
```
這是利用 haskell 無限遞歸構造出來的，間接地把數字都記下來，但是這種形式已經很不直觀了。

這樣也是很現實的，如果只要寫出漂亮的遞歸式子就能解決問題的話，大家都不用學算法了。

***
不過這個例子很能說明，函數式編程才是在實踐「過早優化是萬惡之源」的理念，讓人先寫出正確的代碼，不考慮優化問題。

把問題定義成遞歸形式，其實就等於已經解決問題了。這就是無處不在的動態規劃思想，只是沒有把中間步驟記錄下來而已。

算法效率完全靠編譯器優化，所以編譯器的上限就是 Haskell 的上限。

