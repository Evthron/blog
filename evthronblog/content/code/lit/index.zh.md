---
title: "lit"
description: 
date: 2025-12-28T17:49:18+08:00
lastmod: 2025-12-28T17:49:18+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

# custom event

在 @ 後面可以加入自己定義的事件，在如果在組件裏面定義了 file-click 事件，就能在組件的 tag 用 @file-click 監聽事件

# event bubbling bug
Lion Drawer 組件會監聽所有 transition 事件，而我的 hover 按鈕設置了 color transition 動畫，event propagate upwards，被 Lion Drawer 捕獲了，意外觸發狀態改變。


```javascript
_waitForTransition({ contentNode }) {
  return new Promise(resolve => {
    contentNode.addEventListener(EVENT.TRANSITION_START, transitionStarted);
    contentNode.addEventListener(EVENT.TRANSITION_END, transitionEnded);
  });
}
```

