const express = require("express");
const User = require("../models/user.js");
const expressAsyncHandler = require("express-async-handler");
const util = require("../util.js");
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
        token: util.generateToken(signInUser),
      });
    }
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const createdUser = await user.save();
    if (!createdUser) {
      res.status(401).send({ message: "Invalid data" });
    } else {
      res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: util.generateToken(createdUser),
      });
    }
  })
);

userRouter.put(
  "/:id",
  util.isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send({ message: "User Not Found" });
    } else {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      const updadtedUser = await user.save();
      res.send({
        _id: updadtedUser._id,
        name: updadtedUser.name,
        email: updadtedUser.email,
        isAdmin: updadtedUser.isAdmin,
        token: util.generateToken(updadtedUser),
      });
    }
  })
);

module.exports = userRouter;
