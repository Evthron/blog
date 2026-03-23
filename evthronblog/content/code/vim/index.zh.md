---
title: "vim"
description: 
date: 2026-01-30T00:26:00+08:00
lastmod: 2026-01-30T00:26:00+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

## Jump to next instance of the word that is on the cursor
press `*`

## Search for current selected text
- y
- q /
- p
- Enter

## Open URL
- gx

## replace word with yanked word
- in visual mode, select the word that you want to replace, then press p to paste. The problem is you cannot reuse this operation, because it updates the paste buffer with the replaced word. If you try to repeat this operation, it pastes the word you have just replaced, not the original word you yanked.
- any better solution?

https://vi.stackexchange.com/questions/3328/how-to-replace-a-word-with-a-yanked-word-in-normal-mode
