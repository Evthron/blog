---
title: "opengl"
description: 
date: 2025-10-24T02:29:41+08:00
lastmod: 2025-10-24T02:29:41+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

# closest point

Given two line vectors, calculate the closest point lying on the first line to the second line.

https://www.youtube.com/watch?v=xay2ulmewuk

1. find the cross product between two directions
2. Normalize the normal vector
3. Find any vector that goes from one line to another line
4. calculate the dot product that is perpendicular to the normal vector (distance between two lines)
5. get the vector that can lead as from line 1 to intersecting line 2 by multiplying the normal vector to the distance
6. translate line 1 and to the intersection line
7. find the intersection between the intersection line and line 2.

shortest distance is simultaneously perpendicular to both lines.

vector projection
```cpp
        float s = glm::dot(ray_direction_start, ray_direction_current);
        glm::vec3 ray_closest = ray_origin + s * ray_direction_current;

        glm::vec3 v = ray_closest - face_intersection_point;
        float t = glm::dot(v, face_normal);
        glm::vec3 intersection_point = face_intersection_point + t * face_normal;

        glm::vec3 extrusion_translation = intersection_point - face_intersection_point;
        transform_mat = glm::translate(glm::mat4x4(1.f), extrusion_translation);
```

# normal vector calculation
Given:
- 3 vertices coordinates of a triangle
- the ray vector from the camera to the screen.

Calculate:
- the normal vector of the triangle, pointing towards the screen positive direction.

## Solution
- randomly calculate 2 vectors on the plane of the triangle
    - vertex 1 - vertex 2
    - vertex 1 - vertex 3
- find the cross product
- Check whether the normal vector points at the correct direction (out of the center of the cube)

- calculate the vector from the cube center to the face center, face center - cube center = outward vector
- calculate the dot product between the normal vector and the outward vector, check if more seperated by more than 90 degree on anyplane.
