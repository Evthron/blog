set /p NAME="Gallery name: "
hugo new gallery\%NAME%.md
start C:\"Program Files (x86)"\Vim\vim90\gvim.exe "content\gallery\%NAME%.md"