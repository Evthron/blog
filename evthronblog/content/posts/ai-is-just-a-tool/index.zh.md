---
title: "什麼才算「會用 AI」？"
description: 
date: 2025-05-15T07:50:42+08:00
lastmod: 2025-05-15T13:54:45+08:00
image: 
categories: posts
tags: []
math: true
license: 
hidden: false
comments: true
---

「AI 不會取代人類，但會用AI的人會取代不用 AI 的人」。但什麼才算「會用 AI」？真的是精通 AI 工具的操作技巧嗎？或許目前 AI 的質量還不夠好，仍然需要找人修正，但本質上，這些工作是不是已經失去由人來做的價值了呢？

説來慚愧，兩年前，就在 ChatGPT 爆紅的時候，我也沉迷於 AI 圖像生成工具 Stable Diffusion。讓我樂在其中的，是生成動畫角色的圖片，簡單地説就是「捏人」。

由於角色太冷門，模型的訓練集裏面沒有角色的數據，直接輸入角色的名字是沒效果的。所以要用一大堆的短語組成提示詞 prompt，描述角色的特徵，間接產生一個和角色很像的角色。

這也是我第一次接觸所謂的 Prompt Engineering，聽起來很高端，實際上就是不斷試錯。

舉個例子，要用文字準確描述圖片是很費功夫的，要説明角色形象、衣物、畫面構圖、物件還有整體風格。Prompt Engineering 關心的問題是：

- 什麼提示詞真正有效？有些詞語能徹底改變畫面，有些詞語會被忽略。
- 應該用怎麼排列提示詞，才能兼顧所有的元素？相鄰的詞語可能會互相影響。

比如要捏一個這樣的角色：

![senomiya-akiho](https://www.kirikiribasara.com/wp-content/uploads/2020/04/char2.jpg)

就要用到下面一大串的提示詞，被大家戲稱為咒語：
```
masterpiece, solo,
1 girl has brown eyes and brown hair,
short hair, messy hair, ponytail,
smile, wearing (light blue bow serafuku:1.2) and (dark blue skirt:1.2), (light brown fanny pack:1.3) and (light brown belt:0.9),
sunny sky, clouds
```

這裏的訣竅是，為了指定物件的顏色，又不讓顏色擴散到其他物件上，就要把同類特徵打包在一起，不用逗號隔開，讓模型認為這是一個整體。

同時還要用負面提示詞過濾掉相似但不相干的概念：
```
hair bow, hair ribbon, backpack, messenger bag, shoulder bag, school bag, hand bag, thigh strap, blush, worst quality, (petite,child,infant,toddlers,chibi,sd character:1.1), (bad_prompt_version2:0.8)
````

效果：
![ai-image-1.png](ai-image-1.png)

後來出現了 LoRA，大家可以用自己的少量數據微調模型，什麼角色都捏得出來了。但是我的顯卡很弱，能畫圖就知足，訓練模型就別想了。所以我對這種捏人遊戲失去興趣，覺得是徹底的浪費時間。

最近的 AI 發展衝擊了我的世界觀以後，我又重新撿起起現在新的模型玩玩看。

神奇的是，現在只需要直接輸入角色的名字，完全不需要描述任何人物特徵：

```
1girl, senomiya akiho, robotics;notes, dutch angle, sunny sky, clouds, masterpiece, high score, great score, absurdres
````

![ai-image-2.png](ai-image-2.png)

也就是説，模型的訓練集裏居然已經包含了這些冷門角色！能夠直接識別，不需要辛苦地描述圖片了，也沒必要自己專門訓練角色模型了。一是模型底層的進步（Stable Diffusion XL 模型），二是訓練數據的增加。

雖然 AI 圖片生成，甚至是影片生成，到現在還是很熱門，大家還是在研究怎麼寫 prompt 才能讓生成的效果更好。但我這件小事還是體現了 [The bitter lesson](http://www.incompleteideas.net/IncIdeas/BitterLesson.html) 這篇文章的觀點：人總是試圖藉助自己的知識，小打小鬧地提升 AI 模型的能力，殊不知真正的突破，總是來自更大量的訓練數據。

（這是[另一篇文章](https://cognitivemedium.com/bitter-lesson)對上述觀點的反駁，認為這種做法看似沒用，但卻是人在受算力和數據所限的時候，能做到的最好解答，不是沒意義的。 ）

難道真正的「會用 AI」，是用自己的數據集訓練自己專屬的模型，解決真實的問題嗎？但獲取數據和訓練算力的門檻，對一般人來説實在太高了。

而且，只要領頭的公司推出了專門模型，就連貨真價實地訓練模型的人也可能是徒勞無功。

