---
title: "Accurate Colour Wheel"
description: 
date: 2024-01-29T05:05:42+08:00
lastmod: 2024-08-05T20:03:08+08:00
image: accurate-colour-wheel.png
categories: gallery
tags: ['science', 'art']
math: 
license: 
hidden: false
comments: true
---

Colour wheel help us understand colour mixing and choose appealing colour palates, but most colour wheels doesn't isolate hue from lightness and chroma, causing us to perceive colour in a wrong way. The OKLCH colour space seperates the three elements of colours beautifully so I made use of it and created this this visually accurate colour wheel using the [OKLCH colour picker](https://oklch.com). 

- The 12 hues are evenly distributed, meaning they all looked distinct.
- Chroma = 0.12 is the highest chorma value that doesn't cause gaps in hues in the sRGB colour gamut. 
- The lightness range is limited by the chroma, which has to be between 71-76. I chose lightness = 75.
![oklch-colour-wheel](accurate-colour-wheel.png)


2024/05/25

This drawing doesn't have contrast. There's no difference in luminance and saturation so it looks weird and uncomfortable.
![no-contrast](no-contrast.png)


Now let me repaint it with the preset colour palate from MS Paint. This surely looked childish, but somehow it still looks more pleasant than the above one.
![naive-contrast](naive-contrast.png)

From the numbers, the values of the preset colours are all 100, however, they actually varies in luminance. the values are relative and cannot be used for comparison among colours. This misleads artists.

Oklch colour space does a great job dealing with this problem. I think using it as the base of a traditional colour wheel would be helpful so I made one myself. I also made a discrete version of the colour space. This is one of the six charts.

![value-intensity-chart](value-intensity-chart.png)

The developers of Krita cares about colour spaces, so I hope someone would eventually integrate this colour picker in the tools.


