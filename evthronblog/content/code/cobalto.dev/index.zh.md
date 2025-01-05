---
title: "cobalto.dev"
description: 
date: 2024-08-29T13:09:04+08:00
lastmod: 2024-08-29T13:09:04+08:00
image: 
categories: 
tags: 
math: 
license: 
hidden: false
comments: true
---

-webkit-box

box-orient = flex-direction (row, column)
box-pack = align right center left 
box-direction = rtl ltr ttb btt



 # Link 
``` html
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
```
integrity
crossorign
referrerpoily
link stylesheet
# HTML
## Original
```html
      <div class="progress-bar bg-blue" role="progressbar" style="width: 97%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
```
## Modified
```html
	<div class="progress-bar">
        <div class="progress-experience" style="width: {{ .Get `percentage`}}" role="progressbar">
        </div>
    </div>
```
# CSS
```css
.progress-bar{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 1rem;
    overflow: hidden;
    font-size: 0.75rem;
    background-color: hsl(210, 16%, 93%);
    border-radius: 0.25rem;
    width: 50%;

}
.progress-experience {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    color: #fff;
    text-align: center;
    background-color: #007bff;
    transition: width 0.6s ease;
    background-image: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.15) 75%,
        transparent 75%,
        transparent
    );
    background-size: 1rem 1rem;
  }
  ```
## Modified:
  ```css
.progress-bar{
    display: flex;
    height: 1rem;
    font-size: 0.75rem;
    border-radius: 0.25rem;
    width: 50%;
    background-color: hsl(210, 16%, 93%);

    /* important */
    overflow: hidden;
}
.progress-experience {
    display: flex;
    justify-content: center;
    color: #fff;
    text-align: center;
    background-color: #007bff;
    transition: width 0.6s ease;
    background-image: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.15) 75%,
        transparent 75%,
        transparent
    );
    background-size: 1rem 1rem;
  }
  ```
## Unknown
aria
#### -webkit-box -- web references


-ms-flexbox;