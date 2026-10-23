const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Имя обязательно"],
    minlength: [2, "Имя должно содержать не менее 2 символов"],
    maxlength: [20, "Имя должно содержать не более 20 символов"],
  },
  lastName: {
    type: String,
    required: [true, "Фамилия обязательна"],
    minlength: [2, "Фамилия должна содержать не менее 2 символов"],
    maxlength: [20, "Фамилия должна содержать не более 20 символов"],
  },
  username: {
    type: String,
    required: [true, "Username обязателен"],
    minlength: [5, "Username должен содержать не менее 5 символов"],
    maxlength: [5, "Username должен содержать не более 5 символов"],
  },
});

module.exports = mongoose.model("User", userSchema);
