require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3005;

// Подключение к MongoDB
connectDB();

// CORS для localhost
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3005",
      "http://127.0.0.1:3005",
    ],
    credentials: true,
  }),
);

// Парсинг JSON
app.use(express.json());

// Логирование каждого запроса (один лог на запрос, без дублей)
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// Роуты
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

app.use("/users", usersRouter);
app.use("/books", booksRouter);

// 404 — несуществующий роут
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Обработчик ошибок (500 и валидация)
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res
      .status(400)
      .json({ message: "Validation Error", errors: messages });
  }

  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

// Запуск
app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});
