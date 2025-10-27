---
title: "electron"
description: 
date: 2025-10-07T18:19:27+08:00
lastmod: 2025-10-07T18:19:27+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

## ContextBridge
It is dangerous if the browser can have free access to nodejs permission. Therefore, we need to specifically decide which functions can the renderer.js use. This includes functions that allow the webapp to interact with the local system (since we're making desktop apps).

This is done by creating contetx bridge in preload.js
- contextBridge and ipcRenderer
- contextBridge.exposeInMainWorld
    - expose the function in nodejs to renderer.js, 
- Use ipcMain to connect with the database

## main.js, preload.js renderer.js
- Renderer.js handles HTML rendering, main.js handles all other app logic.
- main.js inject the preload.js to the renderer.js so renderer.js can use the exposed functions

## Electron Forge
The building process requires dpkg and fakeroot.

