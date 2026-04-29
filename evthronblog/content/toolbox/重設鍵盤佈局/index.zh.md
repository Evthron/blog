---
title: "重設鍵盤佈局"
description: 
date: 2026-04-30T00:41:49+08:00
lastmod: 2026-04-30T00:41:49+08:00
image: 
categories: toolbox
tags: ['productivity']
math: true
license: 
hidden: false
comments: true
---

鍵盤佈局的設計並沒有考慮過人體工學：
- 兩隻拇指只用來按一個空格鍵，很浪費。Alt 鍵正好放在拇指旁邊，卻沒什麼用。
- Enter 和 Backspace 要用小指去按，按 backspace 把還要整隻手搬過去。
- 小指能輕鬆按到 CapsLock，也是浪費。

鍵盤上還有不少多餘的鍵：
- Fn 鍵。只有 F2 重新命名， F3 搜尋 和 F11 全屏算是有用的；F4 (Alt+F4 強制關閉窗口)，F5（刷新）和 F12（打開網頁源代碼）佔用一個專門的鍵已經算浪費了。其他 F1, 6,7,8, 9,10，都沒什麽像樣的功能。
- Insert、Pause、ScrollLock 和 NumLock 已經過時了。Home、End、PgUp、PgDn 也不是每個軟件都需要的。

快捷鍵的設計也是在折磨手指。軟件的快捷鍵一大堆，常用的就那麼幾個，還可能是 Ctrl + Shift + Alt + P 之類的奇怪組合。

鍵盤上多餘的鍵重新映射成組合鍵就再適合不過了。我們應該好好感謝這些殘留下來的歷史按鍵，多一個鍵，就能多設定一個功能。

要打字舒服，鍵位至少要改成這樣：
- Capslock -> Backspace
- Left Alt -> Esc
- Right Alt -> Enter
    - 但這樣就沒有 Alt 可以用了
    - 可以把 Alt 搬到 Compose 、Right Ctrl、或者 Fn 鍵上
- Enter -> Win + Space（輸入法語言切換）

我用 Vim 編輯文字，很常用到 Esc 鍵，所以 Capslock -> Esc，Left Alt -> Backspace。

Sticky Keys 也是很值得開起來的，就和很久以前只知道用 CapsLock 打大寫字母的感覺一樣。

鼠標上如果有額外的鍵，自然會用來 Ctrl + C 和 Ctrl + V。沒有的話可以放在 F1 F2 上。

## 瀏覽器操作
常用操作也要 Ctrl 説不過去。
- Shift + Ctrl + T （打開上一個關閉的分頁）
- Ctrl + W （關閉分頁）
- Ctrl + Shift + Tab （往前一個分頁）
- Ctrl + Tab (往後一個分頁)
- Ctrl + T （新增分頁）


- F6 -> Shift + Ctrl + T
- Delete -> Ctrl + W
- PgUp -> Ctrl + Shift + Tab
- PgDn -> Ctrl + Tab
- Insert -> Ctrl + T
 
也可以安裝插件，用 Vim 鍵位操作頁面。但還是方向鍵比較方便，因為 Vim 的價值在於編輯和移動光標，hjkl 反而不是什麼好設計。

## 啓動軟件
多出來的 Fn 鍵適合用來打開軟件，例如：
- 計時器（番茄鐘）
- 字典（例如 Saladict）
- 命令窗口（Terminal）
- 筆記軟件

## 實現方法
要實現這些，只是在軟件內設置快捷鍵是不夠的，需要鍵位重映射工具。
### AutoHotKey (Windows)
AutoHotKey 可以滿足 Windows 上一切自動操作的需求。不過 ahk 腳本的格式難學，而且沒有辦法真正從系統層面修改鍵位；而需要系統管理員權限的界面，像是登入界面和資源管理器，也用不了快捷鍵

## Keyd (Linux)
keyd 能真正在系統層面控制按鍵輸出，相比 AutoHotKey 沒那麽靈活，沒有辦法按程序設置鍵位，而且輸出受到鍵盤佈局影響，會影響鼠標快捷鍵。

「在偏門的佈局上打得飛快，在普通的鍵盤上反而忘記了怎麼打字，本末倒置。」雖然大家都説學 dvorak 是自找麻煩，但幸好我同時需要打中文佈局，所以練成了能在qwerty 和 dvoark 之間切換自如的功夫，多學一種佈局對我説只有好處。這就是所謂的兼容：不想向傳統規範妥協，要和世界作對，就要付出代價，訓練自己在不同標準間切換的能力，

