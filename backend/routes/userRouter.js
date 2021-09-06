const express = require("express");
const User = require("../models/user.js");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../util.js");
const userRouter = express.Router();

userRouter.get(
  "/createAdmin",
  expressAsyncHandler(async (req, res) => {
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
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const signInUser = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!signInUser) {
      res.status(401).send({ message: "Invalid Email or Password" });
    } else {
      res.send({
        _id: signInUser._id,
        name: signInUser.name,
        email: signInUser.email,
        isAdmin: signInUser.isAdmin,
        token: generateToken(signInUser),
      });
    }
  })
);

module.exports = userRouter;
