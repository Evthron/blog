---
title: "Reddit Clipper"
description: 
date: 2025-01-03T04:49:30+08:00
lastmod: 2025-01-03T04:49:30+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

https://github.com/marph91/joppy/blob/master/examples/reddit_clipper.py


beautiful soup 只是用來 parse 收回來的 respones
``` python
def parse_reddit_page(url):
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (X11; Linux ex86_64; rv:105.0) "
            "Gecko/20100101 "
            "Firefox/105.0"
        )
    }
    response = requests.get(url, headers=headers)
    
    # raise error code if problem occurs
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")
    note_body = []
    
    # parse post
    entry = soup.find("div", class_="entry")
    author = entry.find("a", class_="author")
    title = entry.find("a", class_="title")
    note_title = f"{author.text}: {title.text}"
    body = entry.find("div", class_="md")
    note_body.append(md(str(body)))
    
    # parse comments
    note_body.append("## Comments\n\n")
    comment_area = soup.find("div", class_="commentarea")
    comments = comment_area.find_all("div", class_="entry")
    for comment in comments:
        comment_author = comment.find("a", class_="author")
        if comment_author is None:
            # This is the "continue thread" element
            continue
        comment_body = comment.find("div", class_="md")
        note_body.append(f"**{comment_author.text}**: {md(str(comment_body))}")
    return note_title, "".join(note_body)
```

