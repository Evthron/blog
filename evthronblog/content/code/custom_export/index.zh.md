---
title: "Custom Export"
description: 
date: 2024-09-05T15:44:19+08:00
lastmod: 2024-09-05T15:44:19+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

https://github.com/marph91/joppy/blob/master/examples/custom_export.py


Parent Graph 和 edge List 的區別
edge graph 不能輕鬆找到沒有 Parent 的元素。

```python
graph = {[]}
has_parent = {node : False for node in node_list}
for start, end in edge_graph:
	graph[start] = graph.get(start, []}.append(end)
	has_parent[end] = True
```
```python
import argparse
	'''
	make argument parser
	'''
	parser = argparse.ArgumentParser()
	parser.add_argument("--output-folder", default="joplin_note_export")
    parser.add_argument("--api-token", default=os.getenv("API_TOKEN"))
	args = parser.parse_args()
	# What is the data in args?
```
the dash in flag will be converted to underscore
--output-folder -> args.output_folder
Replace bad characters in filenames
https://stackoverflow.com/a/27647173/7410886
```python
def replacements(value: str) -> str:
    """Replace bad characters in filenames."""
    return re.sub(r'[\\/*?:"<>|\s]', "_", value)
```
## Tree element mapping replace
```python
tree = {"servant" : {"saber" : {"excalibur" : {}},
                     "archer" : {"ubw" : {"Caladabolg" : {}}},
                     "lancer" : {"gae_bolg" : {} }}}
mapping = {"saber" : "shirou",
           "archer" : "rin",
           "lancer" : "unknown",
           "servant" : "holy_grail",
           "excalibur" : "beam",
           "ubw" : "sword",
           "Caladabolg" : "Broken Phantasm",
           "gae_bolg" : "lucky E"}

def get_new_tree(tree, mapping):
    new_tree = {} # base case
    for servant, subtree in tree.items(): # current element, child hierarchy
        master = mapping[servant]
        new_tree[master] = get_new_tree(subtree) # leap of faith
    return new_tree

print(get_new_tree(tree, mapping))
```


```python
# 建立資料結構的方法
@dataclass
class TreeItem:
    """Represents a notebook and its children."""
    data: dt.NotebookData
    child_items: List[TreeItem]
    child_notes: List[dt.NoteData]
    child_resources: List[dt.ResourceData]
```

製作從 id 到 item 的 Mapping (item 包含 parent id，所以是 Parent list)
1. 製作 id Parent list (api 得到的 item 包含 parent id）
2. parent list 變成 graph
3. graph 變成 tree (需要 hierarchy recursion)
4. id tree 變成 item tree （需要 recursion）


``` python
def create_hierarchy(api):
    notebooks_flat_api = api.get_all_notebooks(fields="id,title,parent_id")
    notebooks_flat_map = {notebook.id: notebook for notebook in notebooks_flat_api}

    notebook_tree_ids = create_notebook_tree(notebooks_flat_map)

    item_count = defaultdict(int) # 共享外面的 item_count

	# ID Tree 變成 item tree
    def replace_ids_by_items(notebook_tree_ids): ...	
    notebook_tree_items = replace_ids_by_items(notebook_tree_ids)
    return notebook_tree_items
```
```python
def create_notebook_tree(flat_list):
	  # 創建空白的 graph
    graph = {item: set() for item in flat_list}
    roots = []
    for id_, item in flat_list.items():
        parent_id = item.parent_id
	  # 如果 child 有 Parent，就把 child 加進 Parent
        if parent_id:
            graph[parent_id].add(id_)
        else:
            # 如果沒有 parent_id，就等於 root
            roots.append(id_)
```

為 Parent List 轉換 Graph 創建空白的 graph
```python
graph = {item: set() for item in flat_list}
```




#### 把 Tree 轉換成檔案結構 -- flashcards
把 Tree 轉換成檔案結構

1. Build folder for itself
2. tell the child to run this function(create all the directories)
3. output the files (make files after all the directories have been build)



```python
def create_files(api, tree, output_dir: Path):
    output_dir.mkdir(exist_ok=True)

    for item in tree:
        current_directory = output_dir / replacements(item.data.title)
        # Post order traversal
        # 先幫自己創建 output_dir，然後叫自己的 children notebook 自己幫自己創建 current_directory
	    # 真正的第一層是外部提供的地址，不在樹裏面，所以有點彆扭，不過之後的每一層都可以這樣想。
        # 底層：item.child_items 是空的，沒有 children，幫自己創建完畢後就結束。
        create_files(api, item.child_items, current_directory)

        # 要先建立好 directory 才能放進筆記
        # 每一層的筆記本要創建自己的筆記，從最底層開始。

        for note in item.child_notes:
            with open(
                (current_directory / replacements(note.title)).with_suffix(".md"), "w"
            ) as outfile:
                outfile.write(note.body)

		# 創建 Resources，不重要
        for resource in item.child_resources:
            resource_binary = api.get_resource_file(id_=resource.id)
			# 輸出 bianary file 的方法
            with open(
                current_directory / replacements(resource.title), "wb" # write binary
            ) as outfile:
                outfile.write(resource_binary)
```

#### 把 Tree 轉換成檔案結構 -- flashcards
把 Tree 轉換成檔案結構
例子：
```python
from pathlib import Path
desktop_path = Path("C:\\Users\\Jacky\\Desktop\\Test")
def output_to_desktop(tree : dict, output_dir : Path):
    output_dir.mkdir(exist_ok=True)
    for parent, child in tree.items():
        new_path = output_dir / parent
        output_to_desktop(child, new_path)
```


    # 原本的資料結構： directed graph ，只有 edges。
	# 轉換成 Neighbour Graph
	
1. Convert edge graph to neighbour graph
2. Find the roots
3. make the tree from the roots.

1. 建立 Graph，node : set()
2. 用 has parent dict，預設 False，檢查所有 node。
3. 如果 has_parent 等於 False，就把端點加入 roots。

```python rewrite
def convert_edge_graph_to_neightbour_graph(edge_graph):
	graph = { parent : set() for parent, child in edge_graph.keys()}
	check_has_parent = { parent : False for parent, child in edge_graph.keys()}
	for parent, child in edge_graph.keys():
		check_has_parent[child] = True
		graph[parent].add(child)
	roots = [ node for node, has_parent in check_has_parent.items() if not has_parent]
```




```python
def create_notebook_tree(flat_list):
    graph = {name: set() for tup in lst for name in tup}
    has_parent = {name: False for tup in lst for name in tup}
    for parent, child in lst:
        graph[parent].add(child)
        has_parent[child] = True
    roots = [name for name, parents in has_parent.items() if not parents]
```

    
- 把 notebook id 轉換成有實際內容的 notebook item
-  從 dict 變成了 list 結構
-  把 dictionary Tree 改造成 TreeItem tree，每個端點可以儲存 list。TreeItem 是 改造後的 dictionary class
-  這也是 Post-order traversal嗎？從最底層開始建立新的 Tree
```python
def replace_ids_by_items(id_tree):
	item_tree = []
	
	# 從頂層開始，把一層的 Tree Node 加入 item Tree
	for key, value in id_tree.items():
		
		# 需要呼叫 api 才能獲取所有的 child。
		child_notes = api.get_all_notes(notebook_id=key, fields="id,title,body")
		
		# 每有一個 id tree 元素，就要在 item_tree 裏放入一個元素。
		item_tree.append(
		# TreeItem 包含子 notebook data
		# child's child_tree （用遞歸的方式獲取）
		# child's notebook （id, title 和 body）和 resources
			TreeItem(
				# 取用外層的 notebook_flat_map 值
				notebooks_flat_map[key], # notebook_data
				replace_ids_by_items(value), # child_items，value 指 child id_tree
				child_notes,
			)
		)
	return item_tree
```
- key 是 notebook，notebooks_flat_map[key] 是 notebook 的 data
- value 是 child id_tree，所以要用 replace_ids_by_items 轉換成 item_tree
- 底層：value 是空的 dict，傳回空的 list
		
Tree element mapping replace



```python
with open(
	current_directory / replacements(resource.title), "wb" # write binary
) as outfile:
	outfile.write(resource_binary)
```