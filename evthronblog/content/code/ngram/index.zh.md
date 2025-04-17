---
title: "N-gram"
description: 
date: 2025-02-26T19:12:24+08:00
lastmod: 2025-02-26T19:12:24+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

## Start token 和 End token
訓練 n-gram 的時候，需要在句子的前後加上 start token 和 end token，像是 `<s>` 和 `</s>`。

不過仔細想想，End token 的後面不就肯定是新句子了嗎？Start token 似乎是多餘的。

其實，Start token 不止是在標示句子的開始，還是分隔 End Token 和下一句句子的工具。

訓練集的句子之間是獨立的，沒有關係。如果把它們連在一起訓練，不覺得很奇怪嗎？
```
<s> Today the weather is nice </s>
<s> The phenomenon of quantum entanglement challenges our classical intuitions </s>
```
在這個例子中，模型不應該誤以為「今天天氣很好」的下一句會是「量子力學挑戰經典力學的直覺」，因為這兩句只是碰巧放在一起的句子。訓練集句子的順序不應該影響訓練結果。

把句子的交接處變成 bigram ：
```
(nice, </s>), (</s>, <s>), (<s>, The)
```
兩句句子的內容會被 `<s>` 和 `</s>` 分隔開，不會混在一起。

如果是 trigram 的話，一個 Start token 就不夠用了。

- 只用一個 Start token 的 trigram（錯誤的做法）：
```
(nice, </s>, <s>), (</s>, <s>, The), (<s>, The, phenomenon)
```
- 用兩個 Start token 的 trigram：

```
(nice, </s>, <s>), (</s>, <s>, <s>), (<s>, <s>, The)
```

可以看到，句子的結束符不應該和下一個句子開始的單詞連在一起。我們不需要預測句子結束後，下一個新單詞是什麼，因為句子和句子之間是沒有關係的。

## 參考資料
[J&M Ch3 (standford.edu)](https://web.stanford.edu/~jurafsky/slp3/3.pdf) 的第七頁説明了 trigram 的做法，但沒有解釋原因。
