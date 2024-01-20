---
title: "Cardinals and ordinals"
description: 
date: 2024-01-20T22:43:24+08:00
image: 
math: 
license: 
hidden: false
comments: true
---
How many hours have passed from one o'clock to three o'clock? If a baby was born in 2021, how old is he in 2023? These calculations may be trivial.However, the differences between clock hour and time, year and age, and the underlying concepts of cardinals and ordinals are not so trivial.

Cardinals are more useful than ordinals. Cardinals represents the amount of objects. We can apply mathematical operations to cardinals like we combine and separate real life objects. While ordinals are just labels to represent the order of objects and we can't apply mathematical operations on them. We can see that 2 o'clock is after 1 o'clock and 3 o'clock is after 2 o'clock but we can't add 1 o'clock and 2 o'clock up to get 3 o'clock. This is meaningless.

To make use of ordinals, we often need to convert them to cardinals. There are two types of cardinal information we can get from ordinals. One is the total count of ordinals and the other one is the distance between ordinals. 

When we are counting objects, we care about how many objects are there. Not very coincidentally, it's equal to the ordinal of the final object. For example, when we count apples on the table, we go on like 'first apple, second apple, third apple'. If the final apple we counted is the third apple, then there are in total three apples on the table.

On the other hand, we want to know about the distance between ordinals. For example, from 1 o'clock to 3 o'clock, we count '1 o'clock, 2 o'clocks, 3 o'clocks'. There are three 'o'clocks' in total but this is not useful. We care about how many hours have passed. 1 o'clock to 2 o'clock is one hour and 2 o'clock to 3 o'clock is another hour. Hours count the distance between the 'o'clocks'. Similarly, we use '2021, 2022' to count years but we don't care how many year names have passed. We care about the age, which is the distance between the year names. We count three year names from 2021 to 2023 but only two years have passed.

We get the distance between ordinals by subtracting them. 3 - 1 = 2 and 2023 - 2021 = 2. Two hours have passed and the baby is two years old. Conversely, we can add a distance to a ordinal to get the next ordinal. For example, 1 o'clock plus 2 hours equals 3 o'clock.

Although the preceding calculations are for elementary school students and it seems no one has a problem with it, theoretically, we can count from any numbers and in any directions for ordinals so the conversion methods may change. This problem doesn't exist in daily life because we always count from one in ascending order. Unfortunately, programming languages start counting from 0. So if we are not clear with these basic concepts, it's difficult to proceed.
