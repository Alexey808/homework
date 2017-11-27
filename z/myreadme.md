# my_project

## Основные команды для работы с git

### При первом запуске git
```

git config user.name "Alexey"
git config user.email "laiten808@gmail.com"
```
### При создании нового репозитория
```
git init
git remote add myurl https://github.com/Alexey808/my_project.git
git branch laiten
```
### Использование
```
git add .
git commit -m "commit"
git checkout laiten

git fetch myurl master
git pull --rebase myurl master

git push shared laiten  #туда
git pull shared master  #сюда
```
### Дополнительные
```
git config --list
git status
git branch -a
git branch -D //удаление ветки целиком, без вопросов
git remote -v  //просмотреть адреса, привязанные к репозиторию
git remote show shared //где shared наименование адреса
```
### Аллиасы
```
git config --global alias.hist "log --pretty=format:'%h %ad | %s%d [%an]' --graph --date=short"
```
### Исключения
```
# - закоментировать строку
*.a - не обрабатывать файлы, имя которых заканчивается на .a
!test.a - отслеживать в любом случае этот файл, даже если он в исключениях
/test - игнорировать только файл test в корневом каталоге
test/ - игнорировать все файлы в каталоге test/
doc/**/*.txt - игнорировать все .txt файлы в каталоге doc/
.git/info/exclude - Этот файл не коммитуется и остается только в локальном репозитории.
.gitconfig:  excludesfile = ~/.gitexcludes - Исключение для компьютера
```
## Прочее
```
-----
git add bower.json
git commit -m "Add bower.json."
git tag "v0.0.1"
git push origin --tags
-----
git init

git track remote branch     -добавлени
git gdd All/Curren-File     -добавить всё/добавить
git quick commit(repo/curren-fule)  -быстрый коммит
git push current branch     -отправить на гитхаб
git remote add origin <адрес репозитория из п.1 на GitHub/Bitbucket>
git remote -v
---добавление репозитория к локалке
remote add [сокращение] [url]
git remote add shared https://github.com/Alexey808/test-repo.git

---обновление локалки из гитхаб
git fetch [имя удал. сервера] -для получения данных из удалённых проектов
git pull shared master    -добавляю из github ветки мастера к себе на локалку
git pull shared laiten    -добавляю из github ветки laiten к себе на локалку

---
### Консоль
echo "test" >> README.md //добавить строку в конец файла
echo "test" > README.md //перезаписать файл 


### Git
git commit -am "message" //добавить коммит к отслеживаемым файлам 
gut push -ul myurl master
git reset commitHash fileName //убрать отслеживание добавленного файла
git reset HEAD //откат к последнему сохраннёному комиту 