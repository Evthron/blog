set /p MESSAGE="MESSAGE: "
hugo
git add .
git commit -m "%MESSAGE%"
git push
cd D:\Blog\blog\evthronblog\public
git add .
git commit -m "%MESSAGE%"
git push
pause