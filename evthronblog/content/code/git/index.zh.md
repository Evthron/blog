---
title: "Git"
description: 
date: 2025-03-06T05:38:55+08:00
lastmod: 2025-03-06T05:38:55+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

## submodule
make a repo as a node inside another repo, treating the whole folder as one file.
need to make seperate commits.


## change origin url to ssh

```bash
git remote set-url origin git@github.com:username/repo.git
```
Check remote url
```bash
git remote -v
```

## Get update from other's repo after forked
```
git remote add upstream <URL> # Set repo as 'upstream'
git fetch upstream
```

