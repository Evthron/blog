---
title: "own-code"
description: 
date: 2025-01-06T04:19:07+08:00
lastmod: 2025-01-06T04:19:07+08:00
image: 
categories: 
tags: 
math: 
license: 
hidden: false
comments: true
---

### Book card
CSS specificity of nested selectors cause me trouble

- From template
    - .article-page .main-article .article-content img
    - (0, 3, 1) Wins

- What I want to do
    - .book-card-cover
    - (0, 1, 0) loses

use `!important` although bad code

### Count the number of function in python file
```python
import ast
with open(file_path, 'r', encoding='utf-8') as fin:
    tree = ast.parse(fin.read())
    function_count = sum(isinstance(node, ast.FunctionDef) for node in ast.walk(tree))
    python_function_count += function_count
```

### Generate front matter
Generate front matter for all my markdown files
```python
import os
from time import localtime, strftime


def generate(title, date, description = '', lastmod = '', image = '', categories = '', tags = '', slug = '', layout = '') -> str:
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
```

### os.walk()
excludes folders and files that are not needed.
```python
import os
def os_walk_sample(folder_path : Path,
                   ignored_dirs : Optional[List[str]] = None,
                   ignored_files : Optional[List[str]] = None) -> int:
    for root, dirs, files in os.walk(folder_path):
        if ignored_dirs:
            for ignored_dir in ignored_dirs:
                if ignored_dir in dirs:
                    dirs.remove(ignored_dir)
        if ignored_files:
            for ignored_file in ignored_files:
                if ignored_file in files:
                    files.remove(ignored_file)
        for file in files:
```          

### Progress bar module

```python
import math

def level_cap(experience):
    '''
    the total experience points required to reach the next level
    '''
    return level_to_experience(experience_to_level(experience)+1)

def level_bottom(experience):
    '''
    the total experience points required to reach the current level
    '''
    return level_to_experience(experience_to_level(experience))
    
def experience_to_level(value):
    '''
    convert experience to level
    '''
    return math.floor(math.sqrt(value / 6 + 0.25) + 0.5)

def level_to_experience(level):
    '''
    convert level to the minimum experience required to reach that level
    '''
    return 6 * level * (level - 1)

def generate_bar(experience, progress_bar_length):
    '''
    generate an text progress bar with custom length using ascii symbol.
    '''
    experience_earned_since_current_level = experience - level_bottom(experience)
    experience_required_to_level_up = level_cap(experience) - level_bottom(experience)
    length = round(experience_earned_since_current_level / experience_required_to_level_up * progress_bar_length)
    return '▰' * length + '▱' * (progress_bar_length - length)

def generate_custom_bar(current_exp, exp_needed):
    '''
    directly generate the ascii progress bar from given values.
    used for the habitica progress bar in taskwarrior
    '''
    progress_bar_length = 24
    length = round(current_exp / exp_needed * progress_bar_length)
    return '▰' * length + '▱' * (progress_bar_length - length)

def generate_statistics_row(key, value, is_show_level = True):
    '''
    generate text progress bar from dictionary
    used in the skill section of the blog
    '''
    level = experience_to_level(value)
    progress_bar_length = 24
    if is_show_level:
        if value == -1:
            statistics_row = (key.capitalize() + ': ').rjust(30, ' ') + '0'.rjust(3) + ' --- ' + 'Lv0\n\n'
        else:
            statistics_row = (key.capitalize() + ': ').rjust(30, ' ') + str(value).rjust(3) + ' --- ' + 'Lv' + str(level) + ' '+ generate_bar(value, progress_bar_length) + '\n\n'
    else:
        statistics_row = (key.capitalize() + ': ').rjust(30, ' ') + str(value).rjust(3) + '\n\n'
    return statistics_row
```

### random.sample()
Use: Read and randomly order the word list from a file
Note: Although 'sample' sounds like random sampling, picks from random.sample() do not repeat.
```python
with open(filename, 'r') as file:
    words = file.read().split()
random_list = random.sample(words, len(words)) # Picks from random.sample() do not repeat
```

### Count the number of possible scales 
Can be improved to cover general cases.
```python
import math
with open("numbers.txt", "r", encoding='utf-8') as scale, open("output_numbers.txt", "w", encoding='utf-8') as fout:
    total_sum = 0
    for line in scale.readlines():
        original_str = line
        if line != '\n':
            line : str
            number = line.strip().replace(' ', '')
            print(number)
            count_3 = number.count('3')
            count_2 = number.count('2')
            count_1 = number.count('1')
            digit_count = len(number)
            arrangement = math.factorial(digit_count) / math.factorial(count_1) / math.factorial(count_2) / math.factorial(count_3)
            print(arrangement)
            total_sum += arrangement
            fout.write(original_str.removesuffix('\n') + ' = ' + str(int(arrangement)) + '\n')
    fout.write(str(total_sum))
```
```numbers.txt
3333
33321
333111

33 111 111
33 21 111
33 22 11
33 222

3 111 111 111
3 21 111 111
3 22 11 111
3 222 111
3 2222 1

222222
22222 11
2222 11 11
222 11 11 11
22 11 11 11 11
2 11 11 11 11 11
11 11 11 11 11 11
```


### Generate thumbnail
Generate thumbnail from image using pillow, if the image has colour tag, enhance the colour, else, convert to greyscale

```python
from PIL import Image, ImageEnhance
def generate_thumbnail(image_path : Path, output_folder_name = Path("thumbnails")):
    '''
    generate a square 12 by 12 thumbnail to the specified output_folder
    '''
    
    # From https://note.nkmk.me/en/python-pillow-square-circle-thumbnail/
    def crop_max_square(pil_img):
        def crop_center(pil_img, crop_width, crop_height):
            img_width, img_height = pil_img.size
            return pil_img.crop(((img_width - crop_width) // 2,
                                 (img_height - crop_height) // 2,
                                 (img_width + crop_width) // 2,
                                 (img_height + crop_height) // 2))
        return crop_center(pil_img, min(pil_img.size)// 6 , min(pil_img.size)//6 )
    
    
    with Image.open(image_path) as im:
        im = crop_max_square(im)
        if not tag_analysis.has_tags(image_path.name, ['colour']):
            im = im.convert("L")
        im = ImageEnhance.Contrast(im).enhance(1.5)
        im.thumbnail((12, 12))
        im.save(output_folder_name/image_path.name)
``` 
