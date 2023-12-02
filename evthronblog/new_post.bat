set /p NAME="Post name: "
hugo new posts\%NAME%.md
start C:\"Program Files (x86)"\Vim\vim90\gvim.exe "content\posts\%NAME%.md"