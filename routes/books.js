const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// POST /books — создание книги
router.post("/", async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
});

// GET /books - список всех книг
router.get("/", async (req, res, next) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    next(err);
  }
});

// GET /books/:id - данные книги
router.get("/:id", async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({ message: "Book not found" });
    }
    next(err);
  }
});

// PUT /books/:id - изменение данных книги
router.put("/:id", async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({ message: "Book not found" });
    }
    next(err);
  }
});

// DELETE /books/:id - удаление книги
router.delete("/:id", async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({ message: "Book not found" });
    }
    next(err);
  }
});

module.exports = router;
