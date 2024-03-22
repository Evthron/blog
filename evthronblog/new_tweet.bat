set /p NAME="Tweet name: "
mkdir "content/tweet/%NAME%"
hugo new --kind tweet tweet\%NAME%\index.zh.md
hugo new --kind tweet tweet\%NAME%\index.en.md
hugo new --kind tweet tweet\%NAME%\index.tok.md
start C:\"Program Files (x86)"\Vim\vim90\gvim.exe "content\tweet\%NAME%\index.zh.md"
start C:\"Program Files (x86)"\Vim\vim90\gvim.exe "content\tweet\%NAME%\index.en.md"
start C:\"Program Files (x86)"\Vim\vim90\gvim.exe "content\tweet\%NAME%\index.tok.md"
