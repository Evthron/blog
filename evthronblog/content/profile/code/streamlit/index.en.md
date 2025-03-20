---
title: "streamlit"
description: 
date: 2025-03-06T14:35:35+08:00
lastmod: 2025-03-06T14:35:35+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

import streamlit as st

## st.session_state
init as a empty dict, used to store all the self-defined state

st.session_state.{name} = []

## st.sidebar
- st.sidebar.header("Sidebar title")
- item = st.sidebar.selectbox("choose:", st.session_state.list)
    - treat st.session_state.list as select items  
    - return the selected item

st.sidebar.text_input


## with
use `with` without `as`
give context to code, similar to Go syntax
```
with st.chat_message("AI")
    st.markdown(message.content)
```
    
is same as:
```
st.chat_message.markdwon(message.content)
```


