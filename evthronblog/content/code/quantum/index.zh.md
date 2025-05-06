---
title: "量子資訊"
description: 
date: 2025-03-17T02:21:34+08:00
lastmod: 2025-03-17T02:21:34+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

## 自旋

為什麼描述量子態旋轉的角度 $\theta$ 要多除一個 2？例如：

$$
\ket{\psi} = \cos\left(\frac{\theta}{2}\right) \ket{0} + \sin\left(\frac{\theta}{2}\right) \ket{1}
$$


這是因為量子態具有一種特殊的性質，需要旋轉兩個圈才能回到原本的位置，這種特性在物理上稱為「自旋是 1/2」。$\frac{\theta}{2}$ 代表旋轉的範圍是從 $0$ 到 $4\pi$。

## 離散傅立葉變換
基礎頻率 = 疊加態
纏繞頻率 = 週期（第幾個/總共有幾個）

## Quantum Oracle
Reduced 和 Complete 的關係
如果 output register 是 |e_1>，對 |e_1> 進行週期性的取模運算不會改變狀態，因為只是把所有狀態輪一次而已。只有前面的相位會改變，相位改變是全局的，就算 Input Register 沒有改變，也可以認為相位改變是作用在它上面。這就是用 Complete 模擬 Reduced 的做法。

既然 Reduced 很常用， Output Register 應該經常會是 |e_1>。

## Trace
$$
\mathrm{Tr}(A \otimes B) = \mathrm{Tr}(A) \times \mathrm{Tr}(B)
$$
$$
\mathrm{Tr}(|A\rangle \langle B|) = \langle A | B \rangle
$$
$$
\mathrm{Tr}[\mathcal{C}(\rho) \cdot \mathcal{C}(\sigma)] = \mathrm{Tr}(\rho \sigma).
$$
$$
\mathrm{Tr}(|A\rangle \langle A|B\rangle \langle B|) = \langle A | B \rangle^2
$$
