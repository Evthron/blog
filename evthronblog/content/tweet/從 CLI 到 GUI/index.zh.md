---
title: "從 CLI 到 GUI"
description: 
date: 2025-01-18T02:20:58+08:00
lastmod: 2026-06-16T18:52:59+08:00
image: 
categories: tweet
tags: ['coding']
math: true
license: 
hidden: false
comments: true
---

# 從 CLI 到 GUI
如果不用別人寫好的工具，到底要怎麼做出有圖形界面的程序呢？簡單的編程練習總是在純文字的界面打轉。需要用到圖形界面的時候，就要導入一些神奇的函式庫。

只是自己寫給自己用的話，軟件根本不需要有圖形界面，在終端裏輸入命令就足夠了。

***
要和操作系統交互才能畫出窗口，所以需要導入函式庫和用 C++，Python 本身是做不到的。
[how to make gui in python without tools (stackoverflow)](https://stackoverflow.com/questions/20587886/how-to-make-a-simple-gui-in-python-without-using-any-tools-such-as-tkinter-ecli)
瀏覽器是最通用的渲染引擎，所以用網站做 UI 應該是最簡單的……

***

UI 也算是數據可視化的一種吧？

***

UI 是狀態機，所以應該用狀態機圖來設計。Construct User Interface with Statecharts 這本書説明了最基礎的狀態轉移圖(State Transition Diagram) 根本不可能用來描述複雜的軟件，一定要使用帶有層級、記憶、分離等常見模式的符號的 Statechart，才能把狀態數量壓縮到可理解的狀態。

我覺得這本書太着重符號的定義了，對於個人開發來説是過度工程。而軟件沒有實體按鍵，定義狀態本身就不容易，狀態轉移式的代碼也和 JavaScript 的 event action 設計模式不太適配。
