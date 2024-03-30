git status
set /p MESSAGE="Commit Message: "
hugo
git add .
git add .
git commit -m "%MESSAGE%"
git push
cd D:\Blog\blog\evthronblog\public
git add .
git add .
git commit -m "%MESSAGE%"
git push
pause