---
title: "shell"
description: 
date: 2025-09-14T03:18:05+08:00
lastmod: 2025-09-14T03:18:05+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

## Filter consecutive lines
- only show the line if the line repeats more than 5 time consecutively
```sh
uniq -c text.txt | awk '$1 > 5' | sort | uniq 
```

## flag terminator
If your argument starts with `-`, like `yt-dlp -14t6_yu-7w`, it may be treated as a invalid flag. Add `--` before to marks the end of flags, like `yt-dlp -- -14t6_yugw`.


# single quote vs double quote
- single quotes is literal string, shell won't identify the special shell symbols like `$` and `\` in the string.
- e.g. `echo '$1'` will not work, you have to use `echo "$1"`

- what about the '\'? why \- is required for both single and double quotes?

## characters that needs to be escaped in double quotes 
regex?

# sed
use multiple `-e` arguments to sed the same string multiple times


## Mute beeper
setterm -blength 0

## Shell array
If you want to store multiple arguments in a variable, you can make them a shell array.

Example in config file, you are required to do this:
'''shell
#makepkg.conf
#-- Command used to run pacman as root, instead of trying sudo and su
PACMAN_AUTH=(sudo delayed %c)
'''

Use parenthesis to create a shell array, which can be appended before other commands.
Don't put the quote the arguments or they will be treated as one single argument.

# tee

`>` cannot be used if the output location requires sudo privilege. Pipe the output to `tee` instead.
