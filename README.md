# Backend-04 Library API

REST API для управления библиотекой (пользователи и книги), разработанный на Node.js, Express.js и MongoDB (Mongoose).

## Запуск проекта

1. Установите зависимости:
   ```bash
   npm install
   Убедитесь, что MongoDB запущена (локально или через Docker) и в файле .env указана верная строка подключения:
   ```

env
PORT=3005
MONGO_URI=mongodb://127.0.0.1:27017/library
Запустите сервер в режиме разработки (с nodemon):

bash
npm run dev
Или в обычном режиме:

bash
npm start
Сервер будет доступен по адресу: http://127.0.0.1:3005

# Стек технологий

Node.js

Express.js

MongoDB + Mongoose

CORS

dotenv

nodemon

# API Endpoints:

# Пользователи (Users)

1. Создать пользователя
   Метод: POST

URL: http://127.0.0.1:3005/users

Тело запроса (JSON):

json
{
"firstName": "Ivan",
"lastName": "Ivanov",
"username": "ivan_1"
}
Успешный ответ: 201 Created + объект пользователя.

Ошибки: 400 Bad Request (ошибка валидации).

2. Получить всех пользователей
   Метод: GET

URL: http://127.0.0.1:3005/users

Успешный ответ: 200 OK + массив объектов пользователей.

3. Получить пользователя по ID
   Метод: GET

URL: http://127.0.0.1:3005/users/:id

Пример: http://127.0.0.1:3005/users/65a1b2c3d4e5f6a7b8c9d0e1

Успешный ответ: 200 OK + объект пользователя.

Ошибки: 404 Not Found (пользователь не найден или невалидный ID).

4. Обновить пользователя
   Метод: PUT

URL: http://127.0.0.1:3005/users/:id

Пример: http://127.0.0.1:3005/users/65a1b2c3d4e5f6a7b8c9d0e1

Тело запроса (JSON): (можно передать только те поля, которые нужно изменить)

json
{
"firstName": "Petr",
"username": "petr_2"
}
Успешный ответ: 200 OK + обновленный объект пользователя.

Ошибки: 400 Bad Request (ошибка валидации), 404 Not Found.

5. Удалить пользователя
   Метод: DELETE

URL: http://127.0.0.1:3005/users/:id

Пример: http://127.0.0.1:3005/users/65a1b2c3d4e5f6a7b8c9d0e1

Успешный ответ: 200 OK + { "message": "User deleted successfully" }.

Ошибки: 404 Not Found.

# Книги (Books)

1. Создать книгу
   Метод: POST

URL: http://127.0.0.1:3005/books

Тело запроса (JSON):

json
{
"title": "1984",
"author": "George Orwell",
"year": 1949
}
Успешный ответ: 201 Created + объект книги.

Ошибки: 400 Bad Request (ошибка валидации).

2. Получить все книги
   Метод: GET

URL: http://127.0.0.1:3005/books

Успешный ответ: 200 OK + массив объектов книг.

3. Получить книгу по ID
   Метод: GET

URL: http://127.0.0.1:3005/books/:id

Пример: http://127.0.0.1:3005/books/65a1b2c3d4e5f6a7b8c9d0e1

Успешный ответ: 200 OK + объект книги.

Ошибки: 404 Not Found (книга не найдена или невалидный ID).

4. Обновить книгу
   Метод: PUT

URL: http://127.0.0.1:3005/books/:id

Пример: http://127.0.0.1:3005/books/65a1b2c3d4e5f6a7b8c9d0e1

Тело запроса (JSON):

json
{
"title": "1984 (Updated)",
"year": 1950
}
Успешный ответ: 200 OK + обновленный объект книги.

Ошибки: 400 Bad Request (ошибка валидации), 404 Not Found.

5. Удалить книгу
   Метод: DELETE

URL: http://127.0.0.1:3005/books/:id

Пример: http://127.0.0.1:3005/books/65a1b2c3d4e5f6a7b8c9d0e1

Успешный ответ: 200 OK + { "message": "Book deleted successfully" }.

Ошибки: 404 Not Found.

Обработка ошибок (формат JSON)
Все ошибки возвращаются в формате JSON.

400 Bad Request (Ошибка валидации Mongoose):

json
{
"message": "Validation Error",
"errors": ["Имя должно содержать не менее 2 символов"]
}
404 Not Found (Несуществующий роут или сущность не найдена):

json
{
"message": "Not Found"
}
(или "User not found" / "Book not found" в зависимости от запроса)

500 Internal Server Error (Внутренняя ошибка сервера):

json
{
"message": "Internal Server Error",
"error": "Описание ошибки"
}

# Правила валидации данных

Пользователь:
firstName (Имя) — строка, от 2 до 20 символов.

lastName (Фамилия) — строка, от 2 до 20 символов.

username (Username) — строка, ровно 5 символов.

Книга:
title (Заголовок) — строка, от 2 до 20 символов.

author (Автор) — строка, от 2 до 20 символов.

year (Год выпуска) — число.

CORS
Сервер настроен на прием запросов с локальных адресов (localhost:3000, localhost:3005, 127.0.0.1:3005). Если вы будете делать запросы из браузера с другого порта, убедитесь, что он добавлен в белый список в index.js.
