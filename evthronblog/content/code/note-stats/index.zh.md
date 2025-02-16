---
title: "筆記分析"
description: 
date: 2024-09-09T13:02:35+08:00
lastmod: 2024-09-09T13:02:35+08:00
image: 
categories: 
tags: 
math: 
license: 
hidden: false
comments: true
---

```python
def analyze_text(text: str):
    tokens = word_tokenize(text)

	# tokens are all the words
	# reset tokens using list generator
    tokens = [
        # normalize to lower case
        word.lower()
        for word in tokens
        # exculde punctuation
        if word not in ("...", "''", "``", "--", "++") and
        word not in string.punctuation and
        # exclude single character words
        len(word) > 1 and
        # exclude words containing less than one digit
        not any(character.isdigit() for character in word) # generator is allowed to be used in any()
    ]

	# show how many words are there
    print("Words:", len(tokens))

    # filter most common words
    tokens = [
        word
        for word in tokens
        if word not in set(stopwords.words("english") + stopwords.words("german"))
    ]

	# generate frequecy dictionary using FreqDist
    fdist = FreqDist(tokens)
    # fdist.plot(50)
    print("Most common words:")
    for word, count in fdist.most_common(10):
        print(f"- {word}: {count}")
```

 exclude words that contains numbers -- flashcards 
```
def check_word_contain_digit:
	return any(char.isdigit() for char in word)
```
---
## requirements for token
- lowercase
	- word.lower()
- no single character words
	- if len(word) > 1
- No symbol
	- no punctuation
		- if word not in string.punctuation
	- no markdown symbol (front matter +++ ---)
		- if word not in ['+++', '---', '``', `--`, ``++]
	- no word has numbers
		- if not any(c.is_digit() for c in word)
```python
tokens = word_tokenize(text)
    tokens = [
        # normalize to lower case
        word.lower()
        for word in tokens
        # exclude md syntax
        if word not in ("...", "''", "``", "--", "++") and
        # exclude punctuation
        word not in string.punctuation and
        # exclude single character words
        len(word) > 1 and
        # exclude words containing digit
        not any(character.isdigit() for character in word) #generator is allowed to be used in any()
    ]
    print("Words:", len(tokens))
```


def analyze_text(text: str):
``` python
tokens = word_tokenize(text)
    tokens = [
        # normalize to lower case
        word.lower()
        for word in tokens
        # exclude md syntax
        if word not in ("...", "''", "``", "--", "++") and
        # exclude punctuation
        word not in string.punctuation and
        # exclude single character words
        len(word) > 1 and
        # exclude words containing digit
        not any(character.isdigit() for character in word) #generator is allowed to be used in any()
    ]
    print("Words:", len(tokens))

# filter most common words
    tokens = [
        word
        for word in tokens
        if word not in set(stopwords.words("english") + stopwords.words("german"))
    ]

    fdist = FreqDist(tokens)
    # fdist.plot(50)
    print("Most common words:")
    for word, count in fdist.most_common(10):
        print(f"- {word}: {count}")
```