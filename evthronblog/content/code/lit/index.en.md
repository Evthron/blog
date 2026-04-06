---
title: "lit"
description: 
date: 2025-12-28T17:49:18+08:00
lastmod: 2025-12-28T17:49:18+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

# boundary of shadow elements
Some cannot cross boundary in shoelace library

<sl-dropdown>
    <sl-menu>
    <custom-menu> cannot define

Connt 


# design pattern
比起盲從 props downs events up 的 OOP 規條，軟件作為狀態機，就應該允許直接 dom 操作修改 public variable，只要使用 public function 就可以了。

Lit 本來就不強制所有元全部都是 Lit Element，很可能沒有公共父組件，出現平行組件無法直接傳遞 event 的問題

# filetree component

For a filetree, what properties should it store?

# lit basics
- css host

## :host
- change the css of the shadow element itself

- constructor()
- firstUpdated()
- updated()
    - changeProperties
- render()
  render() {
    return html`<div id="editor-container"></div>`
  }

## html syntax
```javascript
    return html`
      <p><button @click="${this._increment}">Click Me!</button></p>
      <p>Click count: ${this.count}</p>
    `;
```
`@click="${this._incriment}"
call _increment function when clicked


## EventListener
@ defines what should the component do when the event is triggered


## connectedCallback
- same as the Web component API

## difference between properties and constructor properties
- 


## CustomEvent
Communicate between components

```js
CustomEvent('file-selected', {
        detail: { index: globalIndex },
        bubbles: true,
        composed: true,
      })
```

# ts vs js
## Typescript
In typescript lit, decorator can be used
