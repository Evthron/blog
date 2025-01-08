---
title: "Anki SQLite"
description: 
date: 2025-01-06T14:00:46+08:00
lastmod: 2025-01-08T11:56:45+08:00
image: 
categories: tweet
tags: ['coding']
math: 
license: 
hidden: false
comments: true
---

Anki 用的是 SQLite。實戰是好事吧？

很順利地把卡片資料從資料庫裏讀出來了，只是看代碼的話，比我之前從 csv 檔案裏提取資料的做法還要簡單。但 Anki 的 SQL 沒有文檔，只能靠 table schema 猜裏面是什麼。給了我不少麻煩。接下來的問題是網頁的設計。

順利完成了。
https://evthron.github.io/zh/sandbox/test-vocab/
參考資料：

本來想用 aqt 這個 python anki api 的，但好像很麻煩，下面這個指南也好像過時了。我不想讀專門給開發 anki 插件的人看的文檔。
https://juliensobczak.com/write/2020/12/26/anki-scripting-for-non-programmers/

python tutorial
https://docs.python.org/3/library/sqlite3.html#sqlite3-tutorial

這個是前人寫的筆記，已經過時了，還是參考了一下。我寫的代碼也會過時嗎？
https://kylerego.github.io/anki-schema#the-notes-table

Anki 用了一個自己寫的排序方法 unicase，比忽略大小寫複雜一點，但 python 的 sqlite 裏面沒有這個排序方法，讓我沒法讀取某些欄目，想自己讀取的話就地自己寫一個換掉。
https://taurit.pl/sqliteexception-no-such-collation-sequence-unicase/
https://www.slingacademy.com/article/sqlite-error-unsupported-collation-sequence/

界面設計的靈感，本來想抄代碼的，但發現其實很簡單，根本不用抄。
https://marcjenkins.co.uk/bookshelf/

