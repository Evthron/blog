---
title: "better-sqlite3"
description: 
date: 2026-10-18T02:05:08+08:00
lastmod: 2026-10-18T02:05:08+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

# better-sqlite3

For fixed SQL statement, prepare and get directly.
For variable sql statement, db.prepare will return a statement object, run the statement by filling in the missing variables.

```
const db = new Database(dbPath)
const stmt = db.prepare('SELECT ???')
const result = stmt.run(var)
```

## Return object
the result of is a object with keys of the required fields, needs to be accessed with result.field_name

## Difference between run and get?

## .get vs .all
- get only gets the first entry
- all gets all entry.

## Transaction
Ensure operations in a for loop is updated atomically 
```
    const transaction = db.transaction((updates) => {
      for (let update of updates) {
        updateStmt.run(
          update.newStart,
          update.newEnd,
          libraryId,
          parentRelativePath,
          update.childPath
        )
      }
    })

    transaction(rangeUpdates)
```
db.transaction

inside a transaction of a database, you can run command of another database the command would be executed, but not in the transaction of that other database.
```javascript

const DB_PATH = 'test.sqlite'
const DB_PATH_2 = 'test-2.sqlite'

const db = new Database(DB_PATH)
const db2 = new Database(DB_PATH_2)


stmts = '''

create table test_table (
    id text primary key,
    field text not null
);

insert into test_table values (1, 'test')';
insert into test_table values (2, null)'; // flawed statment, which stops the db.exec()
'''

const exec1 = db.transaction(db.exec(stmts))
exec1() // this rolls back db to empty state since this is inside a transaction


const exec2 = db.transaction(db2.exec(stmts))
exec2() // this keeps a empty table in db2, since db2 is not in a transaction state
```
