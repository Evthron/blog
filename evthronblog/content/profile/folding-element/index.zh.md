---
title: "摺疊元素"
description: 
date: 2025-02-12T14:37:49+08:00
lastmod: 2025-02-12T14:37:49+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

https://github.com/CaiJimmy/hugo-theme-stack



# 能摺疊的目錄
## Javascript
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
    /// TransitionProperty 設定哪些元素有過渡動畫
    //target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionProperty = 'height';
    target.style.transitionDuration = duration + 'ms';
    // 把數值變成 0，有過渡動畫
    target.style.height = "0";
    target.style.paddingTop = "0";
    target.style.paddingBottom = "0";
    target.style.marginTop = "0";
    target.style.marginBottom = "0";

    // 額外調整？
    target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';

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


### 摺疊動畫
```javascript
target = document.querySelector('.target')
/// TransitionProperty 設定哪些 Property 有過渡動畫
target.style.transtionProperty = 'height, width, padding'
// 過渡時間
target.style.transitionDuration = '1000ms'
// 摺起來
target.style.height = "0"
```

在改變值之前必須先有一個值，如果沒有設置好初始值，第一次的數值會突然出現，不會有動畫。


## 例子

{{< pure-html >}}
<div class="demo" style="display: none; border: solid 1px black; width: 10rem; background-color: orange; font-size : 24px">
    test box
</div>
<button class="toggle-button">toggle</button>

<script>
    let slideUp = (target, duration = 500) => {
        target.classList.add('transiting');
        //target.style.transitionProperty = 'height, margin, padding';
        target.style.boxSizing = 'border-box';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px'; // Set height to current value for animation
        //target.offsetHeight; // Trigger reflow
        target.style.overflow = 'hidden';
        target.style.height = "0";
        target.style.paddingTop = "0";
        target.style.paddingBottom = "0";
        target.style.marginTop = "0";
        target.style.marginBottom = "0";
        window.setTimeout(() => {
            target.style.display = 'none';
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

    let slideDown = (target, duration = 500) => {
        target.classList.add('transiting');
        target.style.removeProperty('display');
        target.classList.add('show');
        let height = target.offsetHeight; // Get height for animation
        target.style.overflow = 'hidden';
        target.style.height = "0";
        target.style.paddingTop = "0";
        target.style.paddingBottom = "0";
        target.style.marginTop = "0";
        target.style.marginBottom = "0";
        target.offsetHeight; // Trigger reflow
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px'; // Animate to full height
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

    let toggle_button = document.querySelector(".toggle-button");
    let demo_box = document.querySelector(".demo");

    let slideToggle = (target, duration = 500) => {
        if (window.getComputedStyle(target).display === 'none') {
            return slideDown(target, duration);
        } else {
            return slideUp(target, duration);
        }
    }

    toggle_button.addEventListener("click", () => {
        if (demo_box.classList.contains('transiting')) return; // Prevent multiple clicks
        slideToggle(demo_box, 500);
    });
</script>

{{< /pure-html >}}

## HTML
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

### CSS
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
