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
