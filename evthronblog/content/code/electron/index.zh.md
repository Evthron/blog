---
title: "electron"
description: 
date: 2025-12-26T15:09:58+08:00
lastmod: 2025-12-26T15:09:58+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

## ContextBridge
It is dangerous if the browser can have free access to all nodejs's functions. Therefore, it need to be specified which functions can renderer.js use, like the functions for OS interactions.

- e.g. You cannot `import path from node:path` in renderer.js

Context bridges needs to be created in `preload.js`
- contextBridge and ipcRenderer
- `contextBridge.exposeInMainWorld`
    - expose the function in nodejs to `renderer.js,` 
- Use ipcMain to connect with the database

## main.js, preload.js renderer.js
- `renderer.js` handles HTML rendering, `main.js` handles all other app logic.
- `main.js` injects the `preload.js` to the `renderer.js,` so `renderer.js` can use the exposed functions
- add `renderer.js` as script inside `index.html`.
 
## Electron Forge
The building process requires dpkg and fakeroot.

