---
title: "python-venv"
description: 
date: 2025-02-24T17:56:55+08:00
lastmod: 2025-02-24T17:56:55+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

error: externally-managed-environment

```bash
python -m venv myenv
source myenv/bin/activate
```

note:

use myenv/bin/{executable} (e.g. myenv/bin/pip) 

don't change the folder path after creating the virtual env

## Conda
```bash
conda create --name myenv python=3.X
conda activate myenv
conda env list
```
