---
title: "vim"
description: 
date: 2026-06-11T03:35:36+08:00
lastmod: 2026-06-11T03:35:36+08:00
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

## Edit macro directly

https://vimtricks.wiki/posts/set-macro-with-let-command

:let @q = 'yyp\<C-a>'

Vim gives 26 registers and don't let us remember what we've done. But the more the better.

2026-08-08
# 3. Chinese
I usually use b and w for text navigation, since there's no space between chinese words , vim can only jump around clauses instead of individual words 

There is a jieba vim plugin for parsing Chinese words in vim but it is not the real problem. most Chinese words are at most 4 characters long , jumping between clause is actually very effective.

the real problem is editing, vim treats punctuation as a word, I need to frequently use d2w to delete a clause. 

and now I rethink about it , jumping using b and w is not effective enough, I don't ever need to jump on a comma or a period , they should be deleted together with the clause

use kana/vim-textobj-user to define custom text object, to let vim know about Chinese punctuation. 

- make b and w skip Chinese punctuation end land on words directly.
- delete the Chinese clause under the cursor, including the following punctuation
- delete the Chinese clause under the cursor, including the previous punctuation

```vim
vim.cmd([[
  call textobj#user#plugin('chinese', {
  \   'part': {
  \     'pattern': '\<.\{-}\([，。！、？：；,.!?;:]\|$\)',
  \     'select': ['c'],
  \   },
  \   'previousPart': {
  \     'pattern': '\([，。！、？：；,.!?;:]\|^\).\{-}\ze\([，、。！？：.,:!?{}()]\|$\)',
  \     'select': ['p'],
  \   },
  \   'cword': {
  \     'pattern': '\<.\{-}\([，。！、？：； ,.!?;:()]\|$\)',
  \     'move-n': 'w',
  \     'move-p': 'b',
  \   },
  \ })
]])
```
define a new object c and p, its used like dc and dp

only the movement with w and b is changed , editing with them is not affected.

this even benefits English text editing , no one wants to often jumps on those punctuations.
