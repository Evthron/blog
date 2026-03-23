---
title: "Say Goodbye to Internet"
description: 
date: 2024-08-12T03:41:28+08:00
lastmod: 2025-01-11T14:16:34+08:00
image: 
categories: toolbox
tags: ['web', 'productivity']
math: true
license: 
hidden: false
comments: true
---

---
title: Say Goodbye to Internet -- en
updated: 2024-06-25 18:39:50Z
created: 2024-01-28 20:13:00Z
tags:
  - en
---
tags:#iw
I used to love surfing the net, this was how I spend holidays: watching videos, playing flash games, reading Wikis, readings Comics. I don't have to eat, I just sit there and see the sun brightness changing from sunrise to sunset. I wake up early to browse, I stay up at night to browse. I never find anything wrong because I still have to spend most of the time at school and I could finish most of my work there.

But I always hate to procrastinate. I hate the feeling to avoid important task and spending time in a fictitious wonderland. Self-control doesn't work. Stay at home for the whole day with my computer and restrain the urge to push the boot button? Doesn't sound right. I need better tools.

## PC: blocking
### Leechblock NG
A must-have blocker. If you hesitate to block the whole website, study its URL carefully, you may just need a small part of the site. It’s best to fully block the sites instead of setting timers.

[chrome](https://chromewebstore.google.com/detail/leechblock-ng/blaaajhemilngeeffpbfkdjjoefldkok) [firefox](https://addons.mozilla.org/en-US/firefox/addon/leechblock-ng)
## PC: hiding
### uBlock Origin
It's not just an ad blocker, but a *wide-spectrum content blocker*, which means you can hide all distracting UI elements, like panels, buttons, and empty spaces on any websites using its element picker.

Banning infinite scroll is the most powerful thing it can do. Infinite scroll on Youtube equals time sink so put the following line into uBlock Origin setting under the 'My Filters' section.

```
youtube.com##ytd-continuation-item-renderer
```

[chrome](https://chromewebstore.google.com/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm) [firefox](https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/)
### uBlacklist
Don't remind yourself that you've blocked sites. Remove them from the search results.
[chrome](https://chromewebstore.google.com/detail/ublacklist/pncfbmialoiaghdehhbnbhkkgmjanfhe) [firefox](https://addons.mozilla.org/en-US/firefox/addon/ublacklist)
## PC: changing habits
### Any RSS reader 
Only read posts on one single page. It can replace the Youtube subscribe page.

## Youtube: blocking
### BlockTube
Youtube is a double-edged sword that can be both educational and time-consuming. Unfortunately, it never offers any kind of sorting system to separate them. Luckily, BlockTube can keep videos out of your sight based on keywords (e.g memes), channel names, and length. Yes, video length is the best way we have to separate useless and educational videos, useful videos have medium length at around 5 minutes to 1 hour. This requires some Javascript. Put the following code into the advanced setting.

```javascript
(video, objectType) => {

  // block videos shorter than 5 minutes and longer than 50 minutes.
  if (video.vidLength > 3000 || video.vidLength < 300) {
    // Block the video
    return true;
  }
  // block videos with less than 1000 viewcount
  if (video.viewCount < 1000){
    return true;
  }

  // Custom conditions did not match, do not block
  return false;
}
```
[chrome](https://chromewebstore.google.com/detail/blocktube/bbeaicapbccfllodepmimpkgecanonai) [firefox](https://addons.mozilla.org/en-US/firefox/addon/blocktube/)
## Youtube: hiding

### Unhook
Empty your homepage and recommended videos. You should only search by keywords on Youtube.

[chrome](https://chromewebstore.google.com/detail/unhook-remove-youtube-rec/khncfooichmfjbepaaaebmommgaepoid) [firefox](https://addons.mozilla.org/en-US/firefox/addon/youtube-recommended-videos/)
## Youtube: building new habits
### yt-dlp
Try download the video before you watch. You will realise how many bandwidth you've waste by watching hours and hours of stream recordings.

## Android: Blocking

There aren't much we can do on phones because we cannot add extensions on mobile browsers. I've heard that firefox is adding this feature, still, there's no guarantee that all the above extensions will work on Android.
### HelpMeFocus
This blocker has the the most important feature of app blocker, which is the ability to block itself to prevent the user changing its setting.
### Universal Android Debloater
App blocker can sometimes be good enough but you can always bypass them by uninstalling them. Rather than testing your self-discipline, the once and for all solution is to uninstall Google Chrome, Youtube and Play Store from your phone. Since they are pre-installed bloatware, you need the [universal android debloater (github)](https://github.com/0x192/universal-android-debloater) the do that.
## iOS: blocking
### Screen Time
Native digital hygiene apps on android all acts like kind reminders, which makes them all jokes. iOS does a better job. As long as you let others keep the passcode for you, you can't break the restrictions.

***
# Linux: system level block
## dnsmasq
