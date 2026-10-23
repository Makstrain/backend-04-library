const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Заголовок обязателен"],
    minlength: [2, "Заголовок должен содержать не менее 2 символов"],
    maxlength: [20, "Заголовок должен содержать не более 20 символов"],
  },
  author: {
    type: String,
    required: [true, "Автор обязателен"],
    minlength: [2, "Автор должен содержать не менее 2 символов"],
    maxlength: [20, "Автор должен содержать не более 20 символов"],
  },
  year: {
    type: Number,
    required: [true, "Год выпуска обязателен"],
  },
});

module.exports = mongoose.model("Book", bookSchema);
