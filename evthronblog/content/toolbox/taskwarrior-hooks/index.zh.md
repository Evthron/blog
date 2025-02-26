---
title: "定製 Taskwarrior"
description: 
date: 2024-11-25T01:51:20+08:00
lastmod: 2024-11-25T02:16:53+08:00
image: 
categories: toolbox
tags: ['coding', 'software']
math: true
license: 
hidden: false
comments: true
---

[Taskwarrior](https://taskwarrior.org) 是一個簡單不花俏，功能豐富的待辦清單軟件。我自己改裝了一下。

第一是實現了性價比排序功能。這是模仿 Supermemo 裏的 [tasklist](https://supermemo.guru/wiki/Tasklist) 功能，可以每個任務估算時間和價值，然後按照價值除以時間，也就是性價比排序。

首先在 taskrc 裏設定 UDA (User Defined Attributes，用户定義的屬性）分別是 Time， Value，和 Worth（= Value / Time）。

```bash
# 不知道為什麼，要是把 Time 和 Value 和定義為 numeric type 的話，顯示就會延伸到小數後很多位。
uda.time.type=string
uda.time.label=Time
uda.value.type=string
uda.value.label=Value
uda.worth.type=numeric
uda.worth.label=Worth
````

然後修改 report.list 的欄位，加入 Time, Value，和 Worth

```bash
default.command=list # 輸入 task 的時候自動執行 task list，而不是 task next
report.list.columns=id,start.age,entry.age,depends.indicator,priority,project,tags,recur.indicator,scheduled.countdown,due,until.remaining,description.count,time,value,worth
report.list.labels=ID,Active,Age,D,P,Project,Tags,R,Sch,Due,Until,Description,Time,Value,Worth
```

最後是根據 worth，也就是性價比排序

```bash
report.list.sort=worth-,start-,due+,project+
```

例子：
```
> task add 買牛奶 time:60 value:30
# 買牛奶要花 60 分鐘
# 我覺得買牛奶對我來説值 30 元

# 顯示效果
ID | Active | Age | Description | Time | Value | Worth  |
19 |        | 1s  | 買牛奶      |  60  |  30   | 0.500  |
```
要讓 taskwarrior 自動計算性價比，就需要用到 hooks，也就是自動和 taskwarrior 一起運行的程序。寫兩個 Shell Script，分別是 on-add.01.prioirty 和 on-modify.01.priority，一個在增加任務的時候執行，另一個在修改任務的時候執行。兩個 Shell Script 的內容是一樣的。

```bash
#!/usr/bin/env bash
TASK=$(</dev/stdin) 
echo "$TASK" | python "$HOME/.config/task/hooks/priority.py" $@ 
```
每次增加或者修改任務，任務就會以 JSON 的形式交給 priority.py 處理，計算任務的性價比。

```python
import sys
import json

try:
    task = json.loads(sys.stdin.readline())
except json.decoder.JSONDecodeError:
    pass
    
# worth calculation
if 'time' in task.keys() and 'value' in task.keys():
    task['worth'] = str("{:.3f}".format(int(float(task['value'])) / int(float(task['time']))))

print(json.dumps(task))

```

第二是我用了 [task2hab (github)](https://github.com/oskapt/task2hab) 這個插件，可以自動把 taskwarrior 的任務同步到 habitica 上。另外我還模仿了另一個插件 [taskwarrior-habitica-bridge (github)](https://github.com/robwhitaker/taskwarrior-habitica-bridge)，修改了一點代碼，讓完成任務的時候可以在終端裏顯示賺到的經驗和金幣。因為這個不是我寫的，我就不展開説了。


