const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /users — создание пользователя
router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

// GET /users — список всех пользователей
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET /users/:id
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({ message: "User not found" });
    }
    next(err);
  }
});

// PUT /users/:id
router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({ message: "User not found" });
    }
    next(err);
  }
});

// DELETE /users/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({ message: "User not found" });
    }
    next(err);
  }
});

module.exports = router;
