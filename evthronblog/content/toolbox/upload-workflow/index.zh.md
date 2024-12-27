---
title: "文章發佈流程"
description: 
date: 2024-12-27T06:01:25+08:00
lastmod: 2024-12-27T07:52:12+08:00
image: 
categories: toolbox
tags: ['coding']
math: 
license: 
hidden: false
comments: true
---

我把文章發佈到網站的流程其實還挺複雜的，在這裏説明一下。

我用 hugo 這個網站生成器建立網站，只要把文字和圖片擺放成 hugo 指定的結構，就可以把它們轉換成網站的代碼，然後把整份代碼上傳到網上去。

hugo 用 content 文件夾存放全部文章內容。可以設置文章分區，每個文章分區都是個文件夾。文章本身也是個文件夾，同一篇文章的多個語言版本都會放在裏面。

- blog
  - content
    - gallery
    - posts
        - cardinal-ordinal
          - index.en.md
          - index.zh.md

但我不會直接在這文件夾裏增加文章，而是先在 Joplin 寫好，再用代碼把文章自動複製到適合的位置。

Joplin 的筆記本結構和上面一樣。每篇文章都是一個筆記本，放在分區筆記本裏，文章筆記本裏放不同語言的文章。
- posts
    - cardinal-ordinal
       - 量數和序數
       - Cardinals and ordinals
	   
為了區分沒寫完的文章和要發佈的文章，我會用 Joplin 的標籤功能，在準備好發佈的文章上加一個語言標籤。

然後我會用兩個 shell script，先是 output_post 把文章導出到 content 文件夾，再用 blog_push 生成網站代碼然後上傳。

以上就是大致的流程，接下來要説一些代碼了。到底要怎麼把文章按照需要的結構，從 Joplin 導出到 content 文件夾裏面呢？joppy 把 Joplin 的 API 用 Python 包裝了一遍，這樣我就能用 python 存取 Joplin 的筆記了。

這個 API ，或者説 Joplin 存放文件的結構，有個麻煩的地方。所有的筆記本雖然表面上有層級關係，實際上是平級的。我不能像一般的樹狀結構一樣從最頂層往下搜尋筆記本，而是只能從底層，也就是所有筆記本開始往上篩選，才能知道這個筆記本的上一級到底是哪一個筆記本。舉個例子，我要查看 cardinal-ordinal 筆記本才能知道它的上一級是 posts 筆記本，而不能直接查看 posts 筆記本裏面有什麼筆記本。這種結構好像是叫作 Parent list，每個端點會指向它的 Parent。

除了要上傳的文章以外，我的 Joplin 裏面還放了幾百篇不相關的筆記，如果要逐篇筆記檢查它屬於哪本筆記本的話會很耗時間。我要先把筆記本篩選一遍再獲取裏面的筆記。剩下的就只是麻煩的搬運工作，代碼如下：

```python
import os
from joppy.client_api import ClientApi as Api

# 調用 joppy 的 API
api = Api(token="YOUR_API_TOKEN")

def output_posts_in_certain_notebook_id(all_notebooks, notebook_id):
    category = api.get_notebook(notebook_id).title
    for notebook_data in all_notebooks:
    
        # 只有當筆記本（文章）放在需要的筆記本（分區）裏面才繼續
        if notebook_data.parent_id != None and notebook_data.parent_id == notebook_id:
        
            # 獲取筆記本裏面的所有筆記（不同的語言版本）
            post_list = api.get_notes(notebook_data.id, fields='created_time,updated_time,body,order,title,id')
            
            folder_name = notebook_data.title
            print(notebook_data.title)
            zh_posts = []
            en_posts = []
            tok_posts = []
            for post_language_version in post_list.items:
                title = post_language_version.title
                
                '''
                如果文章沒有標籤，就跳過
                '''
                tag_list = get_tag_list(post_language_version.id)
                if not tag_list: 
                    continue
                    
                # 把文章按語言版本分類
                if 'zh' in tag_list: 
                    language_code = 'zh'
                    zh_posts.append(post_language_version)
                elif 'en' in tag_list:
                    language_code = 'en'
                    en_posts.append(post_language_version)
                elif 'tok' in tag_list:
                    language_code = 'tok'
                    tok_posts.append(post_language_version)
                else:
                    continue
            combine_and_output_posts_in_same_language(category, folder_name, 'zh', zh_posts)
            combine_and_output_posts_in_same_language(category, folder_name, 'en', en_posts)
            combine_and_output_posts_in_same_language(category, folder_name, 'tok', tok_posts)

def combine_and_output_posts_in_same_language(category, folder_name, language_code, posts):
    if posts:
    
        '''
        這是個把拆成幾段的筆記合併到一起的功能。我是想着用來把一段段的小説合併起來，不過還沒有什麼實際作用
        '''
        posts.sort(key=lambda x: x.order, reverse=True)
        title = posts[0].title
        tag_list = get_tag_list(posts[0].id)
        tag_list.remove(language_code)
        body = ''
        created_time = None
        updated_time = None
        for post in posts:
            if (created_time is None) or (post.created_time < created_time):
                created_time = post.created_time
            if (updated_time is None) or (post.updated_time > updated_time):
                updated_time = post.updated_time
            body += post.body + '\n\n'
        
        '''
        提取筆記的資料，然後扔到 generate_front_matter() 裏面，自動生成 hugo 需要的
        markdown front matter，也就是文章的屬性資料。
        '''
        
        date = created_time.isoformat()[:19] + '+08:00'
        lastmod = updated_time.isoformat()[:19] + '+08:00'
        home_dir = os.environ['HOME'] 
        
        '''
        如果文件夾裏放了圖片，自動在 front matter 裏加入資料，作為文章的標題圖片。
        '''
        feature_png_directory = home_dir + '/Blog/blog/evthronblog/content/' + category + '/' + folder_name + '/' + folder_name + '.' + 'png'
        feature_jpg_directory = home_dir + '/Blog/blog/evthronblog/content/' + category + '/' + folder_name + '/' + folder_name + '.' + 'jpg'
        if os.path.exists(feature_png_directory):
            image = folder_name + '.png'
            front_matter = generate_front_matter(title, date, lastmod=lastmod, tags=repr(tag_list), categories=category, image=image)
        elif os.path.exists(feature_jpg_directory):
            image = folder_name + '.jpg'
            front_matter = generate_front_matter(title, date, lastmod=lastmod, tags=repr(tag_list), categories=category, image=image)
        else:
            front_matter = generate_front_matter(title, date, lastmod=lastmod, tags=repr(tag_list), categories=category)
            
        '''
        把生成的 Markdown 文章複製到指定的文件夾裏面
        '''
        folder_directory = home_dir + '/Blog/blog/evthronblog/content/' + category + '/' + folder_name
        if not os.path.exists(folder_directory):
            os.makedirs(folder_directory)
            
        path = folder_directory + '/index.' + language_code + '.md'
        with open(path, 'w', encoding='utf-8') as fout:
            fout.write(front_matter + '\n' + body)
            print("done in", language_code)
    else:
        print("no post in", language_code)

def generate_front_matter(title, date, description = '', lastmod = '', image = '', categories = '', tags = '', slug = '', layout = '') -> str:
    if lastmod == '':
        lastmod = strftime("%Y-%m-%dT%H:%M:%S+08:00", localtime())
    front_matter = '---\n'
    front_matter += 'title: "' + title + '"\n'
    front_matter += 'description: ' + description + '\n'
    front_matter += 'date: ' + date + '\n'
    front_matter += 'lastmod: ' + lastmod + '\n'
    front_matter += 'image: ' + image + '\n'
    front_matter += 'categories: ' + categories + '\n'
    front_matter += 'tags: ' + tags + '\n'
    front_matter += 'math: \nlicense: \nhidden: false\ncomments: true\n'
    if slug:
        front_matter += 'slug: "' + slug + '"\n'
    if layout:
        front_matter += 'layout: "' + layout + '"\n'
    front_matter += '---\n'
    return front_matter


def get_tag_list(note_id):
    info = api.get_tags(note_id).items
    tag_list = []
    if info:
        for tagdata in info:
            tag = tagdata.title
            tag_list.append(tag)
    return tag_list
               

def main():
    all_notebooks = api.get_all_notebooks()
    # 為需要的筆記本生成檔案
    post_notebook_id = 'PUT_NOTEBOOK_ID_HERE'
    output_posts_in_certain_notebook_id(all_notebooks, post_notebook_id)
    gallery_notebook_id = 'PUT_NOTEBOOK_ID_HERE'
    output_posts_in_certain_notebook_id(all_notebooks, gallery_notebook_id)

if __name__ == '__main__':
    main()
```

如果我完全不用 Joplin 的話，流程應該可以變得更簡單一些，但我做得這麼辛苦，不是很想改。

