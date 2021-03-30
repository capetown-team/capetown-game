[![reactjs](https://img.shields.io/badge/reactjs-%23239120.svg?&style=for-the-badge&logo=css3&logoColor=white)](https://reactjs.org)
[![redux](https://img.shields.io/badge/redux-%23239120.svg?&style=for-the-badge&logo=css3&logoColor=white)](https://redux.js.org/)
[![scss](https://img.shields.io/badge/scss-%23239120.svg?&style=for-the-badge&logo=css3&logoColor=white)](https://sass-scss.ru/)
[![Docker](https://img.shields.io/badge/Docker-%23239120.svg?&style=for-the-badge&logo=css3&logoColor=white)](https://www.docker.com)
[![heroku](https://img.shields.io/badge/heroku-%23239120.svg?&style=for-the-badge&logo=css3&logoColor=white)](https://help.heroku.com)
## Описание
Браузерная игра в жанре Pac-Man, в которой необходимо собрать все монеты и обойти монстров
## PacMan
![Main](/ui/packman.png)
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
  npm run start
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
## Запуск проекта ssr
- 1. Добавить в etc/hosts `127.0.0.1 local.ya-praktikum.tech`
- 2. Скачать сертификаты `cert.pem` и `key.pem` в папку server/certificate
  - [Сгенерировать сертификаты 1 пример](https://www.npmjs.com/package/openssl-self-signed-certificate) 
    - openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 999999 -nodes
  - [Сгенерировать сертификаты 2 пример](https://medium.com/@nitinpatel_20236/how-to-create-an-https-server-on-localhost-using-express-366435d61f28) 
     - Creating Keys and Cerificate (linux terminal)
        + openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 365
     - Get Decrypted Keys
        + openssl rsa -in keytmp.pem -out key.pem
- 3. Запустить проект `npm run start`
- 4. Открыть страницу в браузере [https://local.ya-praktikum.tech:5000](https://local.ya-praktikum.tech:5000), port может быть другим

## Работа с БД
1. В консоли запустить docker-образ с помощью команды docker-compose up
2. После запуска образа подключиться к БД с помощью команды psql postgres://admin:admins@localhost:5436/pacman
3. Скопировать и выполнтиь в консоли код из migration.sql

## Актуальная версия с heroku
На [demo](https://warm-anchorage-94393.herokuapp.com) пример для ознакомления
## Что сделано
- Приложение написано на : `React`, `Redux`, `TypeScript`, `БЭМ` и библиотеки `bem-cn-lite`;
- Настроен Webpack:
  - html: `HtmlWebpackPlugin`;
  - обработка css: `css-loader`, `style-loader`, `sass-loader`, `mini-css-extract-plugin`;
  - сборка TS/JS: `babel`, `ts-loader`;
- Настроен: `server worker`;
- Защита от DOS атак: `express-rate-limit`;
- Защита от xss атак: `serialize-javascript`;
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
