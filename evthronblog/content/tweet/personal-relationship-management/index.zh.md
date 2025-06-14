---
title: "社交管理軟件"
description: 
date: 2025-02-14T12:44:23+08:00
lastmod: 2025-06-14T15:49:47+08:00
image: 
categories: tweet
tags: ['relationship', 'software']
math: true
license: 
hidden: false
comments: true
---

[Never Eat Alone](/zh/skill/right-sider/#keith-ferrazzi-tahl-raz---never-eat-alone--and-other-secrets-to-success-one-relationship-at-a-time) 建議我列個清單，把身邊的人按需要聯絡的頻繁程度分類。我想找有沒有專門負責這個的軟件，就找到了 monica。

[Monica（官網）](https://www.monicahq.com/) 自稱 PRM 軟件，Personal Relationship Management （個人關係管理）。我想 Customer Relationship Management（顧客關係管理）是專門給幹銷售的人管理顧客用的，但一般人拿出相同的架勢管理自己的生活圈子未必沒道理。monica 開源，只要下個 docker image 就可以在本地的電腦使用。[^1] 

![example](https://www.monicahq.com/img/dashboard.png)

我用下來，感覺用來提醒我聯絡別人的功能不是很足夠，只是給我發電郵通知的話多半沒用。我需要的標籤和顯示最近聯絡時間的功能不是很顯眼，最顯眼的活動提醒功能反倒可以用其他日曆軟件代替。能用，但應該有更簡單的工具滿足我的需求才對。普通的文字檔才是更好的選擇嗎？

開發人員正在弄一個叫 [Chandler (monicahq.com)](https://www.monicahq.com/blog/chandler-is-in-beta) 的更新版本，不知道會怎麼樣。

[^1]: docker 是個開發和運行網站的工具。


***

有用的關係並不需要花大量的時間維繫，只要有固定的聯絡頻率，和真正想和別人交流的心就可以了。但我就是缺少這樣的心。為什麼呢？因為過得不好。過得順利的時候，我能全神灌注地聽別人説自己的經歷，思考大家的共同點，但過得不好的時候，聽別人説什麼都感覺在炫耀，想要逃避自己被比下去的感覺。沒有工具能鼓勵我做這件事，至少記錄下來應該是有點用的。

實際上，我現在真正在用的軟件是 Track & Graph。雖然不是專門做這個的，卻很方便。

***
我自己也做了一個[軟件](/zh/code/relationship-tracker/)，需要的功能都有了，但因為我不信任自己的數據庫和界面設計簡陋，所以用不起來……

