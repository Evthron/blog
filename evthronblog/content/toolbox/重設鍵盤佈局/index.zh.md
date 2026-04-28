---
title: "重設鍵盤佈局"
description: 
date: 2026-04-28T19:44:02+08:00
lastmod: 2026-04-28T18:54:54+08:00
image: 
categories: toolbox
tags: ['productivity']
math: true
license: 
hidden: false
comments: true
---

## 不好的位置
鍵盤佈局的設計並沒有考慮過人體工學：
- 浪費兩隻有力的拇指，只用來按一個空格鍵。正好在拇指旁邊的 Alt 鍵卻不怎麼常用。
- Enter 和 Backspace 依賴小指去按，按 backspace 把還要整隻手搬過去。
- 沒用的 CapsLock 放在了小指能輕鬆按到的位置。

## 多餘的鍵
鍵盤上還有不少多餘的鍵：
- Fn 鍵。只有 F2 重新命名， F3 搜尋 和 F11 全屏算是有用的；F4 (Alt+F4 強制關閉窗口)，F5（刷新）和 F12（打開網頁源代碼）佔用一個專門的鍵已經算浪費了。其他 F1, 6,7,8, 9,10，都沒什麽像樣的功能。
- Insert、Pause、ScrollLock 和 NumLock 已經過時了。Home、End、PgUp、PgDn 也不是每個軟件都需要的。

## 快捷鍵
快捷鍵的設計也是在折磨手指。軟件的快捷鍵一大堆，常用的就那麼幾個，還可能是 Ctrl + Shift + Alt + P 之類的奇怪組合。


## 映射
鍵盤上多餘的鍵重新映射成組合鍵就再適合不過了。我們應該好好感謝這些殘留下來的歷史按鍵，多一個鍵，就能多設定一個功能。



## 打字
打字舒服是最重要的，鍵位至少要改成這樣才算理想：
- Capslock -> Backspace
- Left Alt -> Esc
- Right Alt -> Enter
    - 但這麼一來就沒有 Alt 可以用了，可以把 Alt 搬到 Compose 、Right Ctrl、或者某個 Fn 鍵上，偶爾會用得上。 
- Enter -> Win + Space（切換中英文輸入法）

- 文字編輯器 Vim 很常用到 Esc 鍵，但這個鍵在鍵盤的左上角。 

如果你習慣用 CapsLock 打大寫字母的話，建議你改用 Sticky Keys。


## 瀏覽器操作
真不知道這些快捷鍵是誰設計的。説起來也可以安裝插件，用 Vim 鍵位操作頁面，但我覺得還是方向鍵比較方便。
- F6 -> Shift + Ctrl + T （打開上一個關閉的分頁）
- Delete -> Ctrl + W （關閉分頁）
- PgUp -> Ctrl + Shift + Tab （往前一個分頁）
- PgDn -> Ctrl + Tab (往後一個分頁)
- Insert -> Ctrl + T （新增分頁）
 
## 啓動軟件
- F1: 番茄鐘
- F4: 字典（Saladict）
- F7: 命令窗口（Terminal）
- F8: 筆記軟件（Vim）

我的鼠標上有兩個額外的鍵用作複製和貼上。如果鼠標上沒有額外按鍵的話，我會把它們放在兩個 Fn 鍵上。

## AutoHotKey
AutoHotKey 是 Windows 的鍵盤工具，可以滿足一切自動操作的需求。不過 ahk 腳本的格式難學；而且沒有辦法真正從系統層面修改鍵位，需要系統管理員權限的界面，像是登入界面和資源管理器，就是用不了快捷鍵

## Keyd

不知道算 Linux 上沒有 Autohotkey 算不算可惜。不過我也不需要那麼多亂七八糟的功能，只要能改鍵就好。

keyd 是 Linux 上的一個鍵位重映射工具。能真正在系統控制按鍵輸出，相比AutoHotKey沒那麽靈活的，是沒有辦法按程序設置鍵位。而且輸出受到鍵盤佈局影響，同時使用 qwerty 的中文輸入和 dvorak，。

「在偏門的佈局上打得飛快，反而在普通的鍵盤上就打不出字來，不是本末倒置嗎？」不用擔心，我已經掌握了在兩種鍵盤佈局之間切換的能力，並深深體會到了兼容的意義。


***

