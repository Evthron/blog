---
title: "hugo-theme-stack"
description: 
date: 2024-11-25T00:26:35+08:00
lastmod: 2024-11-25T00:26:35+08:00
image: 
categories: 
tags: 
math: 
license: 
hidden: false
comments: true
---

https://github.com/CaiJimmy/hugo-theme-stack


 
```javascript
/**
 * Slide up/down
 * Code from https://dev.to/bmsvieira/vanilla-js-slidedown-up-4dkn
 * @param target 
 * @param duration 
 */
let slideUp = (target: HTMLElement, duration = 500) => {
    // 過渡時間是 2 秒
    duration = 2000
    // 在過渡的時候，為 target 多加一個 transiting element，表示正在過渡
    target.classList.add('transiting');
    /// 設定哪些元素有過渡動畫
    //target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionProperty = 'height';
    target.style.transitionDuration = duration + 'ms';
    // 在 2 秒內把全部變成 0
    target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = "0";
    target.style.paddingTop = "0";
    target.style.paddingBottom = "0";
    target.style.marginTop = "0";
    target.style.marginBottom = "0";
    // 完成過渡之後就去除特性
    window.setTimeout(() => {
        target.classList.remove('show')
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        target.classList.remove('transiting');
    }, duration);
}

let slideDown = (target: HTMLElement, duration = 500) => {
    target.classList.add('transiting');
    target.style.removeProperty('display');

    target.classList.add('show');

    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = "0";
    target.style.paddingTop = "0";
    target.style.paddingBottom = "0";
    target.style.marginTop = "0";
    target.style.marginBottom = "0";
    target.offsetHeight;
    ///target.style.boxSizing = 'border-box';
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        target.classList.remove('transiting');
    }, duration);
}

let slideToggle = (target: HTMLElement, duration = 500) => {
    if (window.getComputedStyle(target).display === 'none') {
        return slideDown(target, duration);
    } else {
        return slideUp(target, duration);
    }
}

export default function () {
    const toggleMenu = document.getElementById('toggle-menu');
    if (toggleMenu) {
        // () => {} 的意思是沒有 parameter，回傳
        toggleMenu.addEventListener('click', () => {
            if (document.getElementById('main-menu').classList.contains('transiting')) return;
            document.body.classList.toggle('show-menu');
            slideToggle(document.getElementById('main-menu'), 300);
            toggleMenu.classList.toggle('is-active');
        });
    }
}
```

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <title> Sticky Sidebar</title>
    <link rel="stylesheet" href="sticky.css">
</head>

<body>
    <div class="container">
        <div class="sidebar">
            <p> This is sidebar</p>
            <figure class="avatar">
                <img src="images/img1.jpg" class="icon" alt="avatar">
                <span class="emoji">❤</span>
            </figure>
            <div class="menu-items">
                <p class="text"> button 1</p>
                <p class="text"> button 2</p>
            </div>
        </div>
        <div class="main">
            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, reiciendis dolore? Dignissimos nesciunt id facilis expedita? Ratione voluptatibus atque quaerat nobis sed quo eveniet libero, et, esse, veritatis hic voluptatum.</p>
            <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis, ad veritatis! Quisquam culpa inventore, vel magnam qui alias quia temporibus unde, voluptates soluta corrupti quasi. Mollitia repudiandae quae laborum ea!</p>
            <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim exercitationem reiciendis fugiat, fuga placeat similique architecto quasi est consequuntur rerum nam. Laboriosam aperiam distinctio aspernatur, ipsam repellat aliquid suscipit a?</p>

        </div>
    </div>
</body>
</html>
```
```css
body{
    margin: 0 0 0 0;
}
header{
    top: 0;
    position: sticky;
    background-color: blueviolet;
}
.container{
    background-color: azure;
    display: flex;
    flex-direction: row;
    height : 200vh;
}

.sidebar{
    position: sticky;
    background-color: aqua;
    height: 100vh;
    width: 20rem;
    display: flex;
    flex-direction: column;
    top: 0;
    align-items: center; /*沿垂直方向對齊*/
}

.avatar{
    position: relative; /*還是不知道為什麼要用 Relative*/
    width: 5rem;
    height: 5rem;
}

.icon{
    width: 5rem;
    height: 5rem;
    border-radius: 5rem;
    box-shadow: 10px 10px 10px #123456;
}

.emoji{
    position: absolute;
    right: 0px;
    bottom: 0px;
    background-color: white;
    border-radius: 20px;
    width : 20px;
    height : 20px;
}

.menu-items{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 5rem;
    align-items: center;
}
.text{
    display: flex;
    justify-content: center;
    width: 4rem;
}
```
