# Групповой проект 1.3: Добавление страниц и роутинга. Контекст


Необходимо реализовать:

1. Роутинг для детальной страницы поста.
2. Реализовать компонент 404 ошибки и роутинг на него.
3. Создать контекст пользователя и использовать его в проекте.


- Пример сайта https://react-learning.ru/post/6431903eaa39712183bbe508
- Свагер https://api.react-learning.ru/api-docs/#/Post/post_v2__groupId__posts
- Список эндпоинтов https://www.notion.so/API-f359059dee014b448955eab8c5b13062?pvs=4
- Классрум https://classroom.google.com/c/NTg4MDgwNTU0ODc5


______________________________________________________________________________________



# Работа с Git и репозиторием

1. Необходимо развернуть проект в своем редакторе VS Code
2. Переключиться на свою ветку " git checkout имя-ветки " (Dmitrii, Lidia, Egor, Alik)
3. Работать в своей ветке и при необходимости выполнить пункт *Слияние веток
4. Ветка - "черновик", находится под именем developer, в неё будем делать слияния. Ветка master для чистового варианта в нее зальем из developer перед проверкой


Слияние веток:

Если мы хотим залить изменения из "своей" ветки (фичи) в основную то нужно:
1. Переключаемся на основную ветку git checkout develop
2. Находясь в основной ветке выполняем команду слияния указывая из какой ветки мы хотим добавить изменения подставив в команду своё имя ветки, например git merge Dmitrii
3. Если мы хотим залить изменения в ветку с фичей (обратная операция), то переключаемся на ветку с фичей git checkout Dmitrii и выполняем команду git merge develop

Удаление ветки:

1. Если после слияния фичи с основной веткой она нам больше не нужна то мы можем сделать команду удаления ветки подставив в команду своё имя ветки, например git branch -d Dmitrii


Отправка комита:

1. Проверка новых изменений в локальном репозитории перед отправкой git status
2. Если есть новые изменение пишем команду git add --all
3. Добавляем комит с информацией об изменениях git commit -m "Добавление функционала" 
4. Запушить на Github командой git push
