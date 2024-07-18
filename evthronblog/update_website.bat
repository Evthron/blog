hugo
git status
set /p MESSAGE="Commit Message: "
git add .
git commit -m "%MESSAGE%"
git push
cd D:\Blog\blog\evthronblog\public
git add .
git commit -m "%MESSAGE%"
git push
pause