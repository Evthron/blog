set /p NAME="Tweet name: "
mkdir "content/tweet/%NAME%"
hugo new tweet\%NAME%\index.zh.md
hugo new tweet\%NAME%\index.en.md
hugo new tweet\%NAME%\index.tok.md
start C:\"Program Files (x86)"\Vim\vim90\gvim.exe "content\tweet\%NAME%\index.zh.md"
start C:\"Program Files (x86)"\Vim\vim90\gvim.exe "content\tweet\%NAME%\index.en.md"
start C:\"Program Files (x86)"\Vim\vim90\gvim.exe "content\tweet\%NAME%\index.tok.md"