---
title: "flask"
description: 
date: 2025-01-06T04:56:51+08:00
lastmod: 2025-01-06T04:56:51+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

``` python
app = Flask(__name__)
port = int(os.environ.get("PORT", 5000))
app.run(host="127.0.0.1", port=port)
```
## Get Url arguments
try:
	request.args.get("query")
except (TypeError, ValueError):
	pass


```
def get_template_fields(progress):
    title = request.args.get("title")

    try:
        scale = int(request.args.get("scale"))
    except (TypeError, ValueError):
        scale = 100



# Review marked
# Special use of conditional
    progress_width = 60 if title else 90
    try:
        progress_width = int(request.args.get("width"))
    except (TypeError, ValueError):
        pass
 
    return {
        "title": title,
        "title_width": 10 + 6 * len(title) if title else 0,
        "title_color": request.args.get("color", "428bca"),
        "scale": scale,
        "progress": progress,
        "progress_width": progress_width,
        "progress_color": get_progress_color(progress, scale),
        "suffix": request.args.get("suffix", "%"),
    }

```
# Conditional Expression
    progress_width = 60 if title else 90
	
