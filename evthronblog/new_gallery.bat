set /p NAME="Gallery name: "
mkdir "content/gallery/%NAME%"
hugo new gallery\%NAME%\index.zh.md
hugo new gallery\%NAME%\index.en.md
start C:\"Program Files (x86)"\Vim\vim90\gvim.exe "content\gallery\%NAME%\index.zh.md"
start C:\"Program Files (x86)"\Vim\vim90\gvim.exe "content\gallery\%NAME%\index.en.md"