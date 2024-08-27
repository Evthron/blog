---
title: "Remap keyboard"
description: 
date: 2023-12-22T03:46:57+08:00
lastmod: 2024-08-26T15:38:06+08:00
image: 
categories: toolbox
tags: []
math: 
license: 
hidden: false
comments: true
---

Ergonomics has never been a concern for past keyboard designers:
- It wasted the most powerful fingers, the two thumbs, on pressing the big fat space bar.
- It abused the right little finger on pressing both enter and the far-away-from-reach backspace.
- It wasted a easy-to-reach spot on the useless CapsLock.

Key combos are hard to learn and bad to our fingers. Try pressing Ctrl + Shift + P and Ctrl + Shfit + Esc everyday, even the daily-used Ctrl+C Ctrl+V are forcing us to press hard on our little fingers. We should have dedicated keys for those frequent moves.

On the other hand, some keys are obsolete and should have been removed a long time ago. Print Screen, Scroll Lock, Pause, Insert. The entire row of function keys are mostly wasted on uncommon actions, like F1 is for opening manual which no one reads, F2 only works in file system to rename files, F4 is only useful when paired with Alt to close programs. This most unacceptable thing is that the functions of F6 to F10 are unknown.

Thankfully, those obsolete keys can become precious real estate since we can remap the key combos on them using a software called AutoHotKey. For example, you can set F1 to F4 to be undo, copy, cut and paste respectively. Here are my AutoHotKey configurations:

## Key combos
- F3: Ctrl + F (Search)

## Browsing
- Delete: Ctrl + w (Close tabs)
- Insert: Ctrl + t (Insert new tab)
- Page Up: Ctrl + Shift + Tab (Switch tab: up)
- Page Down: Ctrl + Tab (Switch tab: down)
- F2: Toggle tabs list (Using extension: Tree style tab)
- F6: Shift + Ctrl + T （Re-open closed tabs in browser）

## Input
- CapsLock swaps with Backspace 
- Right Alt -> Enter
- Left Alt -> Escape (Switch to normal mode in vim)
- Enter -> Win + Space (Switch between Chinese and English input methods)

## Starting software
- F4: Dictionary
- F7: Terminal
- F8: Text editor

Although autohotkey script syntax is hard to learn, it has everything but the kitchen ink and not limited to remapping keys. I recommend everyone to look into it and pick out some features they need.

However, it is Windows exclusive and gave me a little bit headache to find a replacement. For me, keyd is a simple and good enough alternative on Linux.

