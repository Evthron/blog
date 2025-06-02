---
title: "relationship-tracker"
description: 
date: 2025-05-30T21:16:18+08:00
lastmod: 2025-05-30T21:16:18+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

該有的功能都實現了。Grok 一步步神奇地變出我想要的功能。

真的能用下去嗎？自己的數據庫好像很靠不住。不過既然可以導入數據，繼續用原本的方法記錄也沒關係。

https://github.com/Evthron/RelationshipTracker

## Structure
- MainActivity -> MainScreen -> MainViewModel -> AppDatabase -> Dao -> Entities

## Syntax
- var Mode by remember {mutableStateOf("")}
- lambda expression
    - viewModel.getAllConversations().collectLatest { conversations = it }
    - 'Set conversations = the what the function returns'
    - viewModel.getAllConversations().collectLatest { fetchedConversations -> conversations = fetchedConversations}
- flow
    - Flow<List<Conversation>>
    - collectLatest


## Compose
- Surface
    - Theme
    - modifier
- Scaffold
    - topBar
    - botttomBar
    - padding -> send the padding to child objects
- on
    - onDismiss
    - onClick
    - LaunchEffect

## ViewModel
    - interact with database
    - factory
    - Generic type, subclass of Viewmodel
    - \<T: Viewmodel\> create(MainViewModel::class.java)

## Room Database
    - Entity
    - data class
    - enum class
    - Data access object (dao)
    - Non-entity data class (fast access without creating redundancy)

- suspend
    - used whenever a query is performed, all subsequent function is required to be suspend.
    - suspend fun insert()
    - must be called from a *coroutine*?
    - cannot freely called
- flow
    - Flow\<List\<Person\>\>
    - auto update when data changes
- annotations
    - @Insert, @Update, @Delete
    - @Query
- 

## LaunchEffect not executed
In MainScreen.kt:
```kotlin
// Collect conversation data
    LaunchedEffect(viewMode, selectedTag) {
        Log.d("MainScreen", "Collecting conversations: " +
                "viewMode=$viewMode, " +
                "selectedTag=$selectedTag"
        )
        if (viewMode == "AllConversations") {
            if (viewMode == "AllConversations") {
                val conversationsFlow = selectedTag?.let { viewModel.getAllConversationsByTag(it) }
            if (selectedTag == null) {
                combine(
                    viewModel.getAllConversations(),
                    viewModel.getAllConversationStats(),
                ){
                    convs, stats ->
                    conversations = convs
                }
                viewModel.getAllConversations().collectLatest {
                    conversations = it
                    Log.d("MainScreen", "Updated all conversations: ${it.size} items")
                }
            } else {
                viewModel.getAllConversationsByTag(selectedTag!!).collectLatest {
                    conversations = it
                    Log.d("MainScreen", "Updated filtered conversations: ${it.size} items")
                }
            }
            viewModel.getAllConversationStats().collectLatest {
                conversationStats = it
                Log.d("MainScreen", "Updated conversation stats: $it")
            }
        }
    }
```
When any one of the `collectLatest` is triggered, the code after that will not run. Possibly because it triggered the LaunchedEffect function once again interrupted the flow, but I can't find the exact cause.

reworked the code using combine

```kotlin
// Collect conversation data
    LaunchedEffect(viewMode, selectedTag) {
        Log.d("MainScreen", "Collecting conversations: " +
                "viewMode=$viewMode, " +
                "selectedTag=$selectedTag"
        )

        if (viewMode == "AllConversations") {
            // Determine the conversations flow based on selectedTag
            val conversationsFlow = selectedTag?.let { tag ->
                viewModel.getAllConversationsByTag(tag)
            } ?: viewModel.getAllConversations()

            // Combine both flows
            combine(
                conversationsFlow,
                viewModel.getAllConversationStats()
            ) { convs, stats ->
                // Update both values together
                conversations = convs
                conversationStats = stats

                // Log updates
                Log.d("MainScreen", "Updated conversations: ${convs.size} items")
                Log.d("MainScreen", "Updated conversation stats: $stats")
            }.collect() // Collect the combined flow
        }
    }
```
