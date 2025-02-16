---
title: "Note export"
description: 
date: 2024-09-02T16:38:42+08:00
lastmod: 2024-09-02T16:38:42+08:00
image: 
categories: 
tags: 
math: 
license: 
hidden: false
comments: true
---

https://github.com/marph91/joppy/blob/master/examples/note_export.py


 
extend a list generator
Finding notes with certain title.
## Bad version
``` python
for note in notes:
	for title in args.note_titles:
		if note.title == title:
			candidates.append note
```

## Good version

``` python
for title in args.note_titles:
    candidates.extend([note for note in notes if note.title == title])
```	

 ```python
 
# Create a temporary directory for the resources.
    with tempfile.TemporaryDirectory() as tmpdirname:
        # Convert all notes to the specified format.
        os.makedirs(args.output_folder, exist_ok=True)
        for candidate in candidates:
            note = api.get_note(id_=candidate.id, fields="body")
            note_body = note.body

            title_normalized = (
                candidate.title.lower().replace(" ", "_") + "_" + candidate.id
            )
            output_path = (
                f"{args.output_folder}/{title_normalized}.{args.output_format}"
            )
```