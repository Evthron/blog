---
title: "Docker"
description: 
date: 2025-04-06T18:45:16+08:00
lastmod: 2025-04-06T18:45:16+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---


`docker ps`

`docker compose up`

`docker compose down`

`-d` flag: run in background

`docker exec -it`

interact with a container in terminal


How to delete data in a docker container?
- data (like database) is stored in *volume*
- will not be deleted when the container is deleted

`docker volume rm volume-name`
volume-name is defined in compose.yaml
