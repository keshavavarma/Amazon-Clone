const express = require("express");
const User = require("../models/user.js");

const userRouter = express.Router();

module.exports = userRouter.get("/createAdmin", async (req, res) => {
  try {
    const user = new User({
      name: "admin",
      email: "admin@example.com",
      password: "admin",
      isAdmin: true,
    });
    const createdUser = await user.save();
    res.send(createdUser);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
