---
title: "內嵌文件"
description: 
date: 2025-02-18T03:44:53+08:00
lastmod: 2025-02-18T03:44:53+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

在文章內加入文件的 Hugo 模板

pdf.html
```html
<div class="pdf-embed">
    <iframe src="{{ .Get `src` }}" width="100%" height="600" style="border: none;"></iframe>
</div>
```

Example:

```hugo
{{</* pdf src="/evthron-cv.pdf" */>}}
```

{{< pdf src="/evthron-cv.pdf" >}}

