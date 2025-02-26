---
title: "filetags 文件管理法"
description: 
date: 2025-01-18T02:14:37+08:00
lastmod: 2025-01-18T02:30:09+08:00
image: 
categories: toolbox
tags: ['software']
math: true
license: 
hidden: false
comments: true
---

電腦上有大量的文件，為了快速找到自己需要的文件，我們會分類，把文件放到不同的文件夾裏面。分類越細，搜尋效率越高，但分類錯誤的代價也就越大：如果把文件放在了錯誤的文件夾，就可能會丟失文件；如果要修改分類結構，就需要花費大量精力重新整理文件。filetags 這套系統可以避免這個問題。

在現實中，一份文件只能放在一個文件夾裏，所以要考慮分類的先後順序問題：要先按年份分類，再按作者分類，還是先按作者分類，再按年份分類？在電腦上，我們沒要必要照搬這種思路，只要能為文件同時打上作者和年份的標籤，然後按標籤搜尋就可以了。

filetags 會在文件名上打標籤。文件名無論在哪裏都是通用的，不會受到工具的限制，自然也不用害怕丟失重要的標籤數據。格式是把主要文件名和標籤詞之間用「 -- 」分開。例如 document.txt 是 john 寫的書評，就可以把文件名改成 document -- john books review.txt。

這種方法最適合用在散亂的文件上，例如相片和筆記。按照這種方法，檔案結構會變得非常簡單扁平：照片可以先按照時間分類，然後不加組織地放在裏面。

可惜，沒有文件系統會支持這種特別的格式，要搜尋文件的話需要用作者自己寫的 Python 腳本工具，或是自己寫 Regular Expression。

原作者的介紹：[karl-voit.at/managing-digital-photographs](https://karl-voit.at/managing-digital-photographs/)

filetags python script：[github.com/novoid/filetags](https://github.com/novoid/filetags)

