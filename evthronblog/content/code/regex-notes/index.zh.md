---
title: "正則表達式"
description: 
date: 2025-01-18T02:07:02+08:00
lastmod: 2025-01-18T02:07:02+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

## 排除所有不是 ASCII 的字符
```regex
/[^\x00-\x7F]+/
```

## Filetags 搜尋
```regex
/-- (?=.*art)(?=.*gallery).*/
```

## Filename
```python
def replacement(title):
    return re.sub(r'[/\\:*<>"|]', '_', title)
```

## Front matter
