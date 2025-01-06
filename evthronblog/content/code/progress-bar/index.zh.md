---
title: "progress-bar"
description: 
date: 2024-10-06T18:16:08+08:00
lastmod: 2024-10-06T18:16:08+08:00
image: 
categories: 
tags: 
math: 
license: 
hidden: false
comments: true
---

https://github.com/fredericojordan/progress-bar
``` python
app = Flask(__name__)
port = int(os.environ.get("PORT", 5000))
app.run(host="127.0.0.1", port=port)
```
# Special use of conditional
    progress_width = 60 if title else 90


 
```python
@app.route("/<int:progress>/")
def get_progress_svg(progress):
    template_fields = get_template_fields(progress)
    return render_template("progress.svg", **template_fields)


@app.route("/")
def redirect_to_github():
    return redirect("http://127.0.0.1:5000/50")
```
@app.route("這裏是 relative link")
def 這裏放要執行的 function
<int:progress> 可以接受 input


#### Flask 讀取 Url query -- flashcards

Flask 讀取 Url query
@app.route("/<int:variable_name>")



Flask 設定每個 URL 對應的 function -- flashcards
@app.route("")
def test():



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