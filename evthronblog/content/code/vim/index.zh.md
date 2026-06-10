---
title: "vim"
description: 
date: 2026-06-11T03:26:31+08:00
lastmod: 2026-06-11T03:26:31+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

# Vim keys
## Useful keys
`*`: Jump to next instance of the word that is on the cursor

`''`: Go back to the last position before jumping around using `gg` or `G`

`gx`: Open URL

### Search for current selected text in visual mode
1. `y`
2. `q /`
3. `p`
4. `Enter`

### replace with yanked content
- The simple way is: select the words that should be replaced in visual mode, press p to paste in-place.
- But there is a problem: you cannot repeat this operation by `.`, since the paste buffer is overwritten by the replaced word. So if you press `.`, it pastes the replaced word instead of the original content you copied from somewhere else.
- any better solution?

https://vi.stackexchange.com/questions/3328/how-to-replace-a-word-with-a-yanked-word-in-normal-mode

### Plugins: surround
`ysiw`: Add surrounding symbol. 'yank surround' is weird since it's not yanking anything, and the command's rather long, so I remapped `ys` to `s`

`ds`: Delete surrounding symbol

`cs`: Change surrounding symbol

### Plugin: Smart yank
- share copied content between vim and system keyboards, does this automatically when the intent is clear.

### Plugin: vim-exchange

[Vim exchange (github)](https://github.com/tommcdo/vim-exchange)
### tips on paste
- when the yanked content contains newline at the end, when you paste the content, vim will not paste at the cursor, instead, vim pastes the content at the line below the cursor. If you want to paste inline, don't use `DD` to yank the line, use `d$` instead.

## Useful keys for coding
`%`: Go to pair brackets () [] {}

`>>` and `<<`: Indentation, can be remapped to `<Tab>` and `<S-Tab>`

`=`: Smart indenting, but not very useful for bracket-less language like python

### Plugin: mini.comment
`gc`: Toggle comment

### Plugin: wrapping
`yow`: Toggle between soft wrap and hard wrap

 
## Useful keys for writing
`za`: Toggle folding, I remapped to z

`1z=`: fix the spelling of the current word, I remapped to `,`


## Rather useless keys that should be remapped
`,` and `;`: They repeat f, t movements — jump with `n` and `N` (search) are more direct.

`s`: delete current word and go to insert mode - similar to `r` and `c`. Should be remapped for surround plugin

`m`: bookmark the position - too hard to use, search and `''` are simpler

# Vim settings
## Backupcopy Problem
vim defaults uses `backupcopy=auto`. It may creates a new file when saving, which makes birthtime equals to time

set backupcopy=yes to avoid this.
