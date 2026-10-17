---
title: "sqlite"
description: 
date: 2026-10-18T02:02:57+08:00
lastmod: 2026-10-18T02:02:57+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

# foreign key
If you don't set `ON UPDATE CASCADE` then foreign key, it would basically bans you from editing the entries

# migration
use PRAGMA user_version to track the application version of your database schema.

# sqlite

## Useful pragma

pragma table_list
pragma table_info(table_name)

## Index
schema
index

# statements
## insert
```sql
insert into table (column1, column2) values (a, b);
```

https://sqlite.org/lang_insert.html

### on conflict
ON CONFLICT(library_id) DO UPDATE SET
### default




