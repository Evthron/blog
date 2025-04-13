---
title: ".NET"
description: 
date: 2025-04-13T19:31:56+08:00
lastmod: 2025-04-13T19:31:56+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

# .NET Core

.NET Core 有幾種模板，文件結構不同：
- **Razor Pages**：用於網頁
- **MVC**：Model、View、Controller
- **Web API**：用於 API

程式從 **Program.cs** 開始執行。

## Razor Pages

每個 Razor 頁面包含：
- **.cshtml**：處理前端
- **.cshtml.cs**：處理後端

### .cshtml

- **@page**：標記頁面
- **@model**：指定後端代碼（哪個 .cshtml.cs 文件）
- **@{}**：嵌入 C# 代碼
- **@section**：
  - 每個頁面都基於 Pages/Shared 的佈局生成的，所以不需要放進完整的代碼。@section 指定內容對應佈局的哪個部分
- 沒用 @ 包住的部分，會放進布局的 **@RenderBody()**

### .cshtml.cs

- **[BindProperty]**：自動綁定前端數據
- 示例：`public async Task<IActionResult> OnPostUpdateMarkersAsync`
  - 根據方法的名稱處理頁面請求
  - 用了 [BindProperty] 之後，無需手動把 JSON 轉成 object
  - 返回 Task，會變成 JavaScript 的 Promise

## 設置 API Key
```
dotnet user-secrets init
dotnet user-secrets set "GoogleApi:Key" "YOURAPIKEY"
```

在 cshtml.cs 裏面：
```

        private readonly IConfiguration _config;
        public IndexModel(IConfiguration config)
        {
            _config = config;
        }
        var apiKey = _config["GoogleApi:Key"] ?? throw new InvalidOperationException("Google API key not found");
```
