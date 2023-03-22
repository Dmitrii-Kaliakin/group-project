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


______________________________________________________________________________________


# Описние задания 

Внимание! Выполнение этого задания необходимо выполнять в команде (если она есть, если нет можно и одному). Выполнение цепочки заданий по личному проекту обязательна для тех, кто хочет получить оценку отлично в дипломе. Если вы хотите получить оценку хорошо или удовлетворительно, выполнение этого домашнего задания не обязательно. 
PS: Я крайне рекомендую поучаствовать в командной разработке, хотя бы понаблюдать за тем как она ведется.

Необходимо реализовать:
Декомпозировать на компоненты главную страницу демо приложения https://react-learning.ru/
Используя библиотеку https://ant.design/ или https://mui.com/ или любую другую реализовать необходимые компоненты и сделать рендеринг постов из стейта. Изначальное состояние для списка карточек можно получить из прикрепленного файла (так как мы это делали на вебинаре по стилизации).
В интерфейсе должны быть предусмотрена кнопка создания поста. Она будет либо открывать другую страницу либо открывать модальное окно. Функционал перехода на страницу либо открытия модального окна сейчас реализовывать не нужно. Повесьте обработчик события onClick на эту кнопку, который вывод в консоль текст "Есть контакт"
Минимальный набор компонентов: header , footer , post , postList , button
Вы можете создавать и другие компоненты опираясь на образец или собственную фантазию.

Дополнительное задание:
Дополнительные задания, это задания со звездочкой, они не будут оцениваться, но сделают ваш проект лучше и реализовав их вы получите еще больше практики.
Вывести дату в новости человеко-понятном формате. Рекомендуется использовать библиотеку dayjs.
Реализовать пагинацию постов (можно использовать библиотеки компонентов). При первичной загрузке показывается первые 12 постов, другие посты можно посмотреть используя пагинацию.
Мягкий дедлайн по этой работе 25 марта 23:59. У группового проекта один жесткий дедлайн - это день защиты проекта. Но постарайтесь соблюдать мягкие дедлайны, чтобы к защите проекта он точно был готов.






# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
