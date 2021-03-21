[![reactjs](https://img.shields.io/badge/reactjs-%23239120.svg?&style=for-the-badge&logo=css3&logoColor=white)](https://reactjs.org)
[![redux](https://img.shields.io/badge/redux-%23239120.svg?&style=for-the-badge&logo=css3&logoColor=white)](https://redux.js.org/)
[![scss](https://img.shields.io/badge/scss-%23239120.svg?&style=for-the-badge&logo=css3&logoColor=white)](https://sass-scss.ru/)
[![Docker](https://img.shields.io/badge/Docker-%23239120.svg?&style=for-the-badge&logo=css3&logoColor=white)](https://www.docker.com)
[![heroku](https://img.shields.io/badge/heroku-%23239120.svg?&style=for-the-badge&logo=css3&logoColor=white)](https://help.heroku.com)
## Описание
Браузерная игра в жанре Pac-Man, в которой необходимо собрать все монеты и обойти монстров
## PacMan
![Main](https://raw.githubusercontent.com/capetown-team/capetown-game/readme/ui/packman.png)
## Установка
1. Клонировать репозиторий
```
  git clone git@github.com:capetown-team/capetown-game.git
```
2. Скачать пакеты
```
  npm install
```
3. Запустить локальный сервер
```
  npm run dev
```
4. Собрать проект
```
  npm run build
```
5. Линтинг кода
```
  npm run lint
```
6. Линтинг стилей
```
  npm run lint:style
```
## Актуальная версия с heroku
На [demo](https://warm-anchorage-94393.herokuapp.com) пример для ознакомления
## Что сделано
- Приложение написано на : `React`, `Redux`, `TypeScript`, `БЭМ` и библиотеки `bem-cn-lite`;
- Настроен Webpack:
  - html: `HtmlWebpackPlugin`;
  - обработка css: `css-loader`, `style-loader`, `sass-loader`, `mini-css-extract-plugin`;
  - сборка TS/JS: `babel`, `ts-loader`;
- Настроен: `server worker`;
- Добавлены снепшотные тесты ;
- Код стайлинг: `prettier`, `eslint`;
- Создана механика игры.;
- Реализованы страницы:
  - Главная;
  - Игра;
  - Лидеры;
  - Форум;
  - Авторизация;
  - Регистрация;
  - Профиль;
  - Страницы (404, 500);
## Утечки памяти
Для нахождения утечек памяти использовались инструменты вкладки браузера Memory и Perfomance.
С помощью графиков Perfomance замерялись показатели начала и окончания работы. 
![Memory timeline](/ui/perfomancegame.png)

На скриншоте видны периодические "пороги" выделения памяти, которые возникают вследствие работы сборщика мусора.
В целом вся выделяемая память со времени освобождаетмся. Подробнее ниже.

![Memory timeline](/ui/perfomance.png)
## **Команда**
Команда "Кейптаун"
