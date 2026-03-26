---
title: "vim"
description: 
date: 2026-03-27T05:43:42+08:00
lastmod: 2026-03-27T05:43:42+08:00
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

## Go back to the last position before jumping around using `gg` or `G`
press `''`

## Search for current selected text in visual mode
- y
- q /
- p
- Enter

## Open URL
- gx

## replace word with yanked word
- in visual mode, select the word that should be replaced, press p to paste in-place.
- The problem is, you cannot repeat this operation by `.`. The paste buffer is overwritten by the replaced word. So it pastes the replaced word, not the original word you copied from somewhere else.
- any better solution?

https://vi.stackexchange.com/questions/3328/how-to-replace-a-word-with-a-yanked-word-in-normal-mode

## Plugins: surround
- `ysiw`: add surrounding symbol. 'yank surround' is weird since it's not yanking anything, and the command's rather long, so I remapped `ys` to `s`
- `ds`: delete surrounding symbol
- `cs`: change surrounding symbol


# Coding
## Go to pair brackets () [] {}
- %

## Indentation
- `>>` and `<<`, can be remapped to `<Tab>` and `<S-Tab>`
- `=` is smart indent, but not very useful for bracket-less language like python

## Plugin: mini.comment
- `gc`: toggle comment

## Plugin: wrapping
- `yow`, toggle softwrap and hardwrap


## Rather useless keys that should be remapped
- `,` and `;`: repeat f, t movement - I can first jump back more before using the f, t movement, also, `n` and `N` movements through searching are more direct
- `s`: delete current word and go to insert mode - similar to `r` and `c`. Should be remapped for surround plugin
- `m`: bookmark the position - too hard to use, search and `''` are simpler
 
# Markdown
- `za`:  fold toggle, remmaped to z
- `1z=`: fix the spelling of the current word, remapped to `,`

## Plugin: Smart yank
- share copied content between vim and system keyboards, does this automatically when the intent is clear.

## Plugin: vim-exchange
- `cxiw`: exchange the position of two words

