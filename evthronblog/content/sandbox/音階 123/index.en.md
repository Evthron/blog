---
title: "How many scales are there?"
description: 
date: 2025-09-03T15:07:16+08:00
lastmod: 2025-09-05T14:00:56+08:00
image: 
categories: posts
tags: ['maths', 'music']
math: true
license: 
hidden: false
comments: true
---

In a piano piece, only a handful of keys on the board will be played, otherwise it will sound like a mess. Composers only uses the notes from a scale in their mind. When the scale is chosen, the possible intervals that can be played are fixed. This gives character to a music piece. 

Different culture have their own scale to create the distinct sounding of their cultural music. Major scale and minor scale are the most common scales in modern music. the pentatonic scale give a sense of traditional and chinese music.

People only pick those tried and tested, good-sounding scales, if we ignore this limitation, in theory, how many scales could have possibly exist? To better understand our question, let me give a very brief explanation to music notes. 

To write music, we start from one note and travel to other notes by changing pitch, the pitch distance between notes is called interval. Notes that are octaves apart are in perfect harmony, making octave the most natural interval in music. To create more varieties in music, musicians further divide an octave to 12 equal intervals, each of the 1/12 portion is called a semitone. Remember, like line segments, an interval consists of two notes, so there are 13 notes in a octave.

Counting the step sizes of major scale in semitones, it is 2-2-1-2-2-2-1, for minor scale, that sequence is 2-1-2-2-1-2-2. For each scales, we can write such sequence based on the numbers of semitones travels at each step. 

```
Major:           2212221
Harmonic minor:  2122131
Natural minor:   2122122
Pentatonic:      23222
```

Now we can better frame our question: how many sequence are there to divided an octave, if I only allow the steps to be 1, 2 or 3 semitones?

We can easily notice that the sum of all intervals in a scale sums to 12. In combintorics, this is a combination with replacement problem. To count all the possible arrangements, we need to use a technique called stars and bars.

```

3333 = 1

33321 = 20
333111 = 20

33 111 111 = 28
33 21 111 = 105
33 22 11 = 90
33 222 = 10

3 111 111 111 = 10
3 21 111 111 = 72
3 22 11 111 = 168
3 222 111 = 140
3 2222 1 = 30

222222 = 1
22222 11 = 21
2222 11 11 = 70
222 11 11 11 = 84
22 11 11 11 11 = 45
2 11 11 11 11 11 = 11

11 11 11 11 11 11 = 1

Total = 927

```

Therefore, there are in total 927 scales.


If we think deeper, many scales in the 927 combinations are somewhat similar. For example, major and minor actually uses the same set of notes, just different in starting position. C major and A minor both only uses the white keys, but they sound different just because the starting position is different.

For any sequence, we can pick any key inside that sequence as the starting position to create a new sequence. Modes are derived in this way. 

```
Phygian:    1222122
Dorian:     2122212 
Major:      2212221
Locian:     1221222
Aeolian:    2122122
Mixolydian: 2212212 
Lydian:     2221221
```

How many scales are there if we treat these modes as the same? It now becomes a circular permutation with repetition problem. This is not so simple as it may seem. It require Burnside's theorem to calculate the 'orbit' of each sequence.

The final result is 132.

```
3333 = 1
33321 = (20 + 0) / 5 = 4
333111 = (20 + 4) / 6 = 4
33 111 111 = 28 + 4 / 8 = 4
33 21 111 = 105 + 0 / 7 = 15 
33 22 11 = 90 + 6 / 6 = 16
33 222 = 10 + 0 / 5 = 2
3 111 111 111 = 10 + 0 / 10 = 1
3 21 111 111 = 72 + 0 / 9 = 8 
3 22 11 111 = 168 + 0 / 8 = 21
3 222 111 = 140 + 0 / 7 = 20
3 2222 1 = 30 + 0 / 6 = 5
222222 = 1
22222 11 = 21 + 0 / 7 = 3
2222 11 11 = 70 + 10 / 8 = 10
222 11 11 11 = 84 + 6 / 9 = 10
22 11 11 11 11 = 45 + 5 / 10 = 5
2 11 11 11 11 11 = 11 / 11 = 1
11 11 11 11 11 11 = 1
= 1 + 4 + 4 + 4 + 15+16+2+1+8+21+20+5+1+3+10+10+5+1+1

= 132
```


