---
title: "Upload workflow"
description: 
date: 2024-12-27T07:38:36+08:00
lastmod: 2024-12-27T08:38:57+08:00
image: 
categories: toolbox
tags: ['coding']
math: 
license: 
hidden: false
comments: true
---

My workflow for uploading posts is a bit complicatated, let me explain that here.

I use [hugo (official site)](https://gohugo.io) to generate my site. It requries me to put the text files and images in a certain structure so that it can convert them to the website code. Then I can upload the whole piece of code to the hosting service.

Each section of the website, like posts and gallery, are represented as a folder on my computer. If I need to have multiple language versions for the same article, I also need to put them inside the same folder.

- blog
  - content
    - gallery
    - posts
        - cardinal-ordinal
          - index.en.md
          - index.zh.md

I don't add files directly inside the content folder. I first prepare the conten in Joplin and use code to generate the required content structure.

I mimic the same folder structure in Joplin using nested notebooks. Each section is a represented as a notebook in Joplin. Each article stored inside the section notebook is represented as a notebook too. It stores the notes storing the content for each language version.

- posts
    - cardinal-ordinal
       - 量數和序數
       - Cardinals and ordinals
 
When an note is ready to pubilsh, I add a language code tag on it. In this way, I won't accidentally publish drafts. 

Then I use python to generate the files and shell script to upload the website.

Now for the actual code to execute the procedure. [Joppy (github)](https://github.com/marph91/joppy) is the tool for me to output the files from Joplin. It implements the Joplin API in python.

Due to its database nature, the way how Joplin stores folders is not intuitive. The 'nested' notebooks in Joplin are not actually nested. Unlike the common tree-like file structure, in Joplin, only the chlid notebooks store who their parent is, while the parent notebook has no access to its child. For instance, if I want to know which notebooks are the child of 'posts', I have to search through all the notebooks to check whether its parent is 'post'. It seems that this is the 'parent list' data structure, where each child is pointing to its parent.

It would be very time consuming if I have to check through my few hundreds unrelated notes in Joplin. I only want to check the notebooks that represent my blog sections. However, due to Joplin's database nature, the way how Joplin stores folders is not intuitive. Unlike the common tree-like file structure, in Joplin, only the chlid notebooks store who their parent is, while the parent notebook has no access to its child. For instance, if I want to know which notebooks are the child of 'posts', I have to search through all the notebooks to check whether its parent is 'post'. It seems that this is the 'parent list' data structure, where each child is pointing to its parent.
 
Now I know how to filter the notebooks, all that's left is the hassle of generating the actual markdown files. Let's take a look at the final code:

```python
import os
from joppy.client_api import ClientApi as Api

# Use Joppy API
api = Api(token="YOUR_API_TOKEN")

def output_posts_in_certain_notebook_id(all_notebooks, notebook_id):
    category = api.get_notebook(notebook_id).title
    for notebook_data in all_notebooks:
    

        # Continue only when the notebook (article) is inside the correct parent notebook (section)
        if notebook_data.parent_id != None and notebook_data.parent_id == notebook_id:

            # Get all the notes (articles in various language versions) inside the notebooks
            post_list = api.get_notes(notebook_data.id, fields='created_time,updated_time,body,order,title,id')
            
            folder_name = notebook_data.title
            print(notebook_data.title)
            zh_posts = []
            en_posts = []
            tok_posts = []
            for post_language_version in post_list.items:
                title = post_language_version.title
                
                '''
                Skip the note if the note has no tags
                '''
                tag_list = get_tag_list(post_language_version.id)
                if not tag_list: 
                    continue
                    
                # Group the notes according to language
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
        This part combines the notes if multiple notes exist.
        It was for combining paragraphs in a long story but it has yet to
        be useful.
        '''
        posts.sort(key=lambda x: x.order, reverse=True)
        title = posts[0].title
        tag_list = get_tag_list(posts[0].id)
        tag_list.remove(language_code)
        body = ''
        created_time = None
        updated_time = None
        # Use the latest created/update time if multiple notes exist 
        for post in posts:
            if (created_time is None) or (post.created_time < created_time):
                created_time = post.created_time
            if (updated_time is None) or (post.updated_time > updated_time):
                updated_time = post.updated_time
            body += post.body + '\n\n'
        

        '''
        Extract the note data for generating front matter for the markdown file
        '''
        
        date = created_time.isoformat()[:19] + '+08:00'
        lastmod = updated_time.isoformat()[:19] + '+08:00'
        home_dir = os.environ['HOME'] 
        
        '''
        If there's a image with a correct file name in target folder, use that as feature image
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
        Output the generated markdown file to the target folder
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
    post_notebook_id = 'PUT_NOTEBOOK_ID_HERE'
    output_posts_in_certain_notebook_id(all_notebooks, post_notebook_id)
    gallery_notebook_id = 'PUT_NOTEBOOK_ID_HERE'
    output_posts_in_certain_notebook_id(all_notebooks, gallery_notebook_id)

if __name__ == '__main__':
    main()
```

This workflow can be simpified if I ditch Joplin completely, but since seperating the writing place and the finished stuff has some benefits and I made lots of effort to finish the code, I don't really want to change for now.

