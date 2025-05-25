---
title: "qr-only-browser"
description: 
date: 2025-05-25T13:15:04+08:00
lastmod: 2025-05-25T13:15:04+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

如何製作一個只能掃 QR Code 上網的軟件
- Camera API
- QR Code Scanner
    - ZXing
- Webview
    - Navigation

- Activity, Intent, View
- Android Studio
```
MyApp/
├── app/
├── build.gradle
├── settings.gradle
└── gradle/
```
Material 3

- 主要的代碼在 app/src/main/java/MainActivity.kt
- AndroidManifest.xml 設定需要的權限
- build.gradle.kts 設定 dependencies
- libs.versions.toml 設定 build.gradle.kts dependencies 的具體版本號
- Android Studio Sync Project With Gradle File 的作用是下載 Dependencies
- Compose 能讓我們在 .kt 裏定義網站的外觀，而不是用以前的 XML
    - @Composable 定義網站的組件
- Two build.gradle.kts files in package and project are different

我的夢想只用三個半小時就完成了，LLM 真的無敵……

https://github.com/Evthron/QROnlyBrowser

***
302 Redirect
shouldOverrideUrlLoading
