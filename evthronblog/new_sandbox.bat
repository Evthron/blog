set /p NAME="Sandbox name: "
mkdir "content/sandbox/%NAME%"
hugo new sandbox\%NAME%\index.zh.md
start C:\"Program Files (x86)"\Vim\vim90\gvim.exe "content\sandbox\%NAME%\index.zh.md"