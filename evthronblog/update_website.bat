git status
set /p MESSAGE="Commit Message: "
hugo
cd D:\Blog\blog\evthronblog\public
git add .
git commit -m "%MESSAGE%"
git push --force
cd D:\Blog\blog\evthronblog
git add .
git commit -m "%MESSAGE%"
git push --force
pause