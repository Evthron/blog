---
title: "高階運算"
description: 
date: 2025-03-14T10:42:27+08:00
lastmod: 2025-04-13T19:25:26+08:00
image: 
categories: posts
tags: ['maths']
math: true
license: 
hidden: false
comments: true
---

$e$ 之所以「自然」，是因為以 $e^x$ 的增長率與函數的數值本身一致。其實所有指數函數的增長率都和自身成正比，只不過 $e^x$ 但比例係數剛好是1而已。$e$ 雖然特別，但也沒有什麼神秘之處。

增長率居然能會隨着數值連貫地上升，實在是很難想象。例如在 $x = 2.5$ 的時候，$e^x$ 的增長率就是 $e^{2.5}$。如果 2 次方是自乘兩次，3次方是自乘三次，那麼 2.5 次方就是自乘 2.5 次嗎？

我們最初學習小數乘法時，很容易就能明白「乘以 1.5」的意義。乘以 1.5 是加上一半，只是簡單的除法。但雖然 1.5 次方可以同樣理解為「再乘上一半」，但因為這涉及了平方根的概念，所以不像除法一樣直觀，對很多人來説就很難懂了。

如果指數已經這麼複雜了，那更高階的運算呢？乘法是連續的加法，指數運算是連續的乘法，那麼，連續的指數運算，也就是四階運算（tetration）會怎麼樣？

例如 $2 \uparrow \uparrow 3 = 2^{2^2} = 16$, $2 \uparrow \uparrow 4 = 2^{2^{2^2}} = 65536$，那麼 $2 \uparrow \uparrow 3.5$ 會是什麼？

四階運算有沒有微分的概念？如果有，會不會有一個像 $e$ 一樣的常數，具有「變化率等同自身」的性質？

***
我發現，這是數學上沒有定論的問題，也沒有研究的價值。

指數運算之所以實用，是因為它能夠通過各種運算規則（指數律），從離散的定義（整數次方）自然地擴展到連續的定義（非整數次方）。這種連續性使得我們能夠定義導數，研究函數的變化率。

然而，運算階數的提升讓運算規則變得越來越稀少，交換律、分配律、結合律都消失了，只剩下遞歸的定義，難以找到一種自然的連續化方式。沒有連續性，就不用談什麼微積分。

更不用説，這種誇張得超乎想象的運算本來就沒有實際意義，我就連這究竟是在算什麼的比喻都想不出來。算不算得出來也只有少數數學家才會關心了。

[Beyond exponentiation: A tetration investigation (youtube)](https://www.youtube.com/watch?v=qdqPTEpq5Xw)

[What's so special about Euler's number e? | Chapter 5, Essence of calculus (youtube)](https://www.youtube.com/watch?v=m2MIpDrF7Es)

