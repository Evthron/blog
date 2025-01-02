---
title: "oklch.com"
description: 
date: 2024-12-23T09:27:45+08:00
lastmod: 2025-01-03T05:43:08+08:00
image: 
categories: 
tags: 
math: 
license: 
hidden: false
comments: true
---

# HTML
```html
<!-- input number field -->
<div class="card_number">
  <div class="field">
    <!-- keyboard shortcut button logo-->
    <!-- <kbd class="field_hotkey" aria-hidden="true">l</kbd> -->
    <input
      class="field_input"
      role="spinbutton"
    />
    <!-- increase arrow -->
    <!-- what is tab index? -->
    <button class="field_control is-increase"></button>
    <!-- decrease arrow -->
    <button class="field_control is-decrease"></button>
  </div>
</div>
```
# CSS
```css

button{
  cursor: pointer; //cursor change to hand
}

.card_number{
    // What is inset-inline-end?
    inset-inline-end: 32px;
    width: 110px;
    border-radius: 5px;
    overflow: hidden;
    top: 20px;
}

.field{
    position: relative;
}

.field_input{
    // location

    // functional
    width: 100%;
    box-sizing: border-box;
    height: 40px;

    // aesthetic
    background-color: whitesmoke;
    border: none;
    // location of the cursor (inner space of the field);
    // updown = 0
    // leftright = 12px
    padding: 0px 12px;
}

.field_input[role="spinbutton"]{
  padding-inline-end: 30px;
  text-align:right;
}

.field_control{
    // location
    position: absolute;
    right: 0;

    // size
    height: 50%;
    width: 22px;

    // aesthetic
    border: none;
    // background-color: lightcoral;
}

.field_control.is-increase{
    // location
    top: 0;
    right: 0;

    // aesthetic
    background-color: #ff95a6;
    transform: rotate(180deg);
}

.field_control.is-decrease{
    // location
    bottom: 0;
    right: 0;

    // aesthetic
    background-color: #58c5ff;
}

.field_control:before {
  // function
  content: "";
  position: absolute; // overlap on the button
  top: 1px; //gap betton the shapes
  // left: 50%;

  // size
  width: 12px;
  height: 12px;
  margin-left: -6px;

  // aesthetics
  background: white;
  border-radius: 0px 0 6px 6px; //staring from top-right, clockwise
}

.field_control:after {
  --width:  6px;
  position: absolute;
  top: 10%;
  left: calc(50% - var(--width) /2);
  right: 50%;
  width: var(--width);
  height: 6px;
  // margin-left: 50%;
  content: "";
  background: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%206%206'%3e%3cpath%20fill='%23000'%20d='M.707%201.825%202.62%204.057a.5.5%200%200%200%20.76%200l1.913-2.232A.5.5%200%200%200%204.913%201H1.087a.5.5%200%200%200-.38.825Z'/%3e%3c/svg%3e");
}
```