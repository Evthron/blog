---
title: "node"
description: 
date: 2025-12-25T14:00:28+08:00
lastmod: 2025-12-25T14:00:28+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

2025-12-28
# package.json

`npm upgrade` will upgrade to the highest possible version that matches the range specified in `package.json`. 
## Ranges
`^`: only upgrade minor and patch versions (when >= 1.0.0)
`~`: only upgrade patch versions (when minor version is specified)

See documentation for other conditions
https://github.com/npm/node-semver#caret-ranges-123-025-004
https://github.com/npm/node-semver#tilde-ranges-123-12-1

Unfortunately, semantic versioning may be deceiving. A patch version could still introduce breaking changes.

## special config
`"peer": true`
