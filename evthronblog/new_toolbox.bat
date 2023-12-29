set /p NAME="Toolbox post name: "
hugo new toolbox\%NAME%.md
start C:\"Program Files (x86)"\Vim\vim90\gvim.exe "content\toolbox\%NAME%.md"