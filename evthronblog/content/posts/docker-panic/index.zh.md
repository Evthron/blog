---
title: "docker 連不上網的解決辦法和折騰的悲哀"
description: 
date: 2024-10-17T19:37:47+08:00
lastmod: 2025-01-18T01:58:38+08:00
image: 
categories: posts
tags: ['grumble']
math: 
license: 
hidden: false
comments: true
---

電腦出了問題，我就會死纏爛打，絕不放棄，這種性格連我自己也感到很無奈。

學校的作業要用到 Docker 開發網頁，把 Docker 想象成一個工具箱就可以。我發現網頁在 Docker 裏面連不上網，功課做不成了。很不巧，我用的是 Arch Linux。一般人用的操作系統不是 Windows 就是 MacOS。但 Arch 是要自己逐步把一個個組件拼起來的操作系統。好處是無論系統出了什麼問題都可以自己修理，壞處是會遇到很多一般人根本不會遇到的問題，可以説是作繭自縛。

作業裏要連接外部網站的是一個 PHP 程式，是不是程式出錯了？老師給的程序應該不會錯，我對 PHP 又是一竅不通，隨便找了個網站的例子改了改程式碼，沒用。

仔細看看網站報了什麼錯，'Temporary failure in name resolution'，DNS 出問題了。想必是因為我裝了個奇怪的 dnsmasq，雖然很危險但沒辦法只好暫時停用了。沒用。

那麼是 Docker 的問題嗎？我對 Docker 也是一竅不通。説到底，這門課也用不着我們懂。本來只是輸一行 `docker compose up` 的事，裏面發生什麼事情完全不用管。唉，沒辦法，我還是學了一下 Docker 的運作原理。Docker 可以克服不同電腦甚至操作系統之間水土不服的問題，把開發環境連網站打包成容器 (Container），就哪裏都可以用。原來如此!我還自作聰明地把 Dockerfile，也就是設定檔裏的一行 apt-get 刪掉了呢。 Arch 上下載軟件的工具是 pacman，不是 apt。但只要設定好開發環境裏用 Apache，就沒問題。我把 Container 刪了再重建，沒用。

我慌了，這還不夠嗎？看來是網絡設定問題，這就很麻煩了，可以出錯的地方太多了。安裝 Arch 的時候，設置網絡是最頭疼的部分。光説軟件層面已經有一大堆能把人搞糊塗的概念：網絡接口、網絡管理器、主機、IP 地址、端口、域名、DNS、防火牆。如果是 Docker 要調整內部的網絡設定，那就要弄官方文檔上説的什麼「端口轉發」，我一點也看不懂。

總之先上網找找看。最好先排除學校給的容器有問題的情況。原來只要一句就可以調試 Docker 網絡。 `docker run busybox ping google.com`，借一個叫 busybox 的開發環境，向google 發一個乒乓球，看看對方會不會傳球回來。沒反應，丟包率 100%。

網上的答案都説是 docker 是 DNS 設定出錯了。沒有辦法把 google.com 翻譯成真實的 IP 地址。要手動把 docker 的 dns 服務器改成 `8.8.8.8`，也就是 Google 提供的 DNS 服務器。一樣沒用。

```
/etc/docker/daemon.json
{
    "dns": ["8.8.8.8"]
}
```

這時我想起來，直接 ping IP 地址就可以排除 DNS 服務器的影響了。`docker run busybox ping 127.0.0.1`，這次成功，確認了 Docker 可以連上自家主機。然後是`docker run busybox ping 8.8.8.8`，但一樣不管用。

説不定是防火牆的問題，乾脆關掉，沒用。我連防火牆軟件都試着從 ufw 換到 firewalld，還是沒用。

這下就徹底沒辦法了，只能像無頭蒼蠅一樣在各大論壇遊走碰運氣。Arch wiki，Gentoo wiki，當然少不了 StackOverFlow。解決方法有一大堆，就是沒一種管用。別問我是什麼意思，我也不知道。按指示執行自己看不懂的步驟可是操作電腦的基本功。

## Arch wiki
在 /etc/docker/daemon.json 設定：
```
https://wiki.archlinux.org/title/Docker#Starting_Docker_breaks_KVM_bridged_networking
{
  "iptables": false
}
```

## Gentoo wiki
https://wiki.gentoo.org/wiki/Docker#Networking

在 /etc/sysctl.d/local.conf 裏設定：
```
net.ipv4.ip_forward=1
```
## 改 docker-compose.yaml
https://stackoverflow.com/questions/33780947/not-able-to-connect-to-network-inside-docker-container
```
services:
  worker:
    build: .
    network_mode: host #added here
```

### 使用主機的網絡
這個辦法是有效的，繞過了問題，但好像不能和 `docker compose` 一起用。
https://stackoverflow.com/a/5626362
``` 
docker run busybox --network="host" ping google.com
```

## Windows 式修理法
https://stackoverflow.com/a/68474595
```
sudo systemctl restart docker
reboot
```

## nftables flush
https://bbs.archlinux.org/viewtopic.php?id=277653
https://bbs.archlinux.org/viewtopic.php?id=277638

```
sudo nft flush ruleset
sudo pacman -R nftables 
```


搞了這麼久，真的感覺自己在浪費時間，趕緊換到 Windows 弄 WSL (Windows Subsystem of linux）或者直接在 Linux 上裝虛擬機肯定會比較快。但我只要一被麻煩纏上就沒有心情思考其他的解決辦法。我説不定是在追求柳暗花明的感覺。


幸好，36 個字節真的可以改變改變命運，答案其實就藏在同一條問題的深處。
https://stackoverflow.com/a/70452290

```
sudo systemctl disable nftables
sudo systemctl stop nftables
sudo reboot
```

我明明已經解除安裝 nftables 了，是沒有重啓，還是因為再下載了要用到 nftables 的 firewalld 呢？總之現在再試 `docker run busybox ping google.com` 成功了！PHP 程式也順利拿到了網站的 JSON 檔案。真的高興得要拍手慶祝。

搞了半天，我學會什麼了呢？重新温習了一遍 Arch 的上網設置，放棄了原本已經調整好的 dnsmasq，還知道了 nftables 和 iptables 有着神秘的關係。一天就這樣過去了。

***
nftables 和 iptables 指的是一套規則，負責處理訊息在各種 IP 上的接收和發送，設置好了可以充當防火牆。docker 能讓多個網站運行在相同的端口號上，原理説不定也是什麼端口轉發。

