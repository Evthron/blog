---
title: "python"
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

## enumerate(items, start=1)
Use the `start` argument to control the start index of the enumeration
```python
items = ['a', 'b', 'c']
for index, item in enumerate(items, 1):
    print(index, item)
```

```
1 a
2 b
3 c
```


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


## zip(\*[...])
- auto crop to the length of the shortest list