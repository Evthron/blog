---
title: "shell"
description: 
date: 2025-09-14T03:15:05+08:00
lastmod: 2025-09-14T03:15:05+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

## Shell array
In linux config files, sometimes it's required to input argument in the form of shell array.

'''shell
#makepkg.conf
#-- Command used to run pacman as root, instead of trying sudo and su
PACMAN_AUTH=(sudo delayed %c)
'''

Use parenthesis to create a shell array, which can be appended before other commands.
Don't put the arguments in quotes, otherwise they will be treated as a single argument.
