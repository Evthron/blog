---
title: "重設鍵盤佈局"
description: 
date: 2023-12-21T22:44:00+08:00
lastmod: 2024-08-04T07:58:40+08:00
image: 
categories: toolbox
tags: []
math: 
license: 
hidden: false
comments: true
---

現在的鍵盤佈局完全沒有考慮過人體工學：
- 沒好好利用有力的拇指，兩隻手指按一個空格鍵。難得有兩個很容易用拇指按到的 Alt 鍵，卻很不常用。
- 常用的 Enter 和 Backspace 要用小指去按，還離得很遠。
- 沒用的 CapsLock 放在了小指能輕鬆按到的位置。如果你習慣用 CapsLock 打大寫字母的話，我建議你改用 Sticky Keys。
- 還有一個特別的例子：文字編輯器 Vim 很常用到 Esc 鍵，但這個鍵居然在鍵盤的左上角。 

至少要改成這樣才算理想的鍵位：
- Capslock -> Backspace
- Left Alt -> Esc
- Right Alt -> Enter

鍵盤上還有不少多餘的鍵：
- 上面一排 F1 到 F12 沒什麼用。有用的預設功能只有 F2 （重新命名）和 F3（搜尋）；勉強稱得上有用的有 F4 (Alt+F4 強制關閉窗口)、F11（放大窗口到全屏幕）；只有網頁開發人員有用的有 F12（打開網頁源代碼）。這些功能真的值得專門佔一個寶貴的鍵嗎？
- Insert、Pause、ScrollLock，NumLock，這些鍵已經沒有意義了。Home、End、PgUp、PgDn 也不算常用。

另一方面，快捷鍵的設計也是在折磨手指。軟件的快捷鍵一大堆，常用的就那麼幾個，還可能是 Ctrl + Shift + Alt + P 之類的奇怪組合。用鍵盤上多餘的鍵取代組合鍵就再適合不過了。我們應該好好感謝這些殘留下來的歷史按鍵，多一個鍵，就能多設定一個功能。

AutoHotKey 是 Windows 專用的改鍵工具。很簡單就能實現以上的要求。缺點是無法進行需要權限的系統操作，像是在登入界面和資源管理器裏，AutoHotKey 的設定無法生效。不知道以系統管理員權限運行 AutoHotKey 有沒有用。

我把鍵盤設定成這樣： 

## 瀏覽器
- F6 -> Shift + Ctrl + T （打開上一個關閉的分頁）
- Delete -> Ctrl + W （關閉分頁）
- PgUp -> Ctrl + Shift + Tab （往前一個分頁）
- PgDn -> Ctrl + Tab (往後一個分頁)
- Insert -> Ctrl + T （新增分頁）
- Enter -> Win + Space

## 打字
- Capslock -> Backspace
- Left Alt -> Esc
- Right Alt -> Enter
這麼一來就沒有 Alt 可以用了，可以把 Alt 搬到 Compose 鍵、Right Ctrl、Backspace、或者某個 Fn 鍵上，偶爾會用得上。 
- Enter -> Win + Space（切換中英文輸入法）

## 啓動軟件
- F1: 番茄鐘
- F4: 字典（Saladict）
- F7: 命令窗口（Terminal）
- F8: 筆記軟件（Vim）

我的鼠標上有兩個額外的鍵，用作複製和貼上了。如果鼠標上沒有額外按鍵的話，我就會把它們放在兩個 Fn 鍵上。

## Keyd
Linux 上沒有 Autohotkey。keyd 是個簡單易用的替代品。缺點是沒有辦法按每個程序設置快捷鍵，只能設置全局快捷鍵。而且輸出受到鍵盤佈局影響，我會同時使用 qwerty 的中文輸入和 dvorak，有時候就會出錯。

