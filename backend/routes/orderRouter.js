const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Order = require("../models/Order.js");
const util = require("../util.js");

const orderRouter = express.Router();

orderRouter.post(
  "/",
  util.isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log(req.user._id);
    const order = new Order({
      orderItems: req.body.orderItems,
      user: req.user._id,
      shipping: req.body.shipping,
      payment: req.body.payment,
      itemPrice: req.body.itemPrice,
      shippingPrice: req.body.shippingPrice,
      tax: req.body.tax,
      totalPrice: req.body.totalPrice,
    });
    const createdOrder = await order.save();
    if (!createdOrder) {
      res.status(401).send({ message: "Invalid data" });
    } else {
      res
        .status(201)
        .send({ message: "New Order Created", data: createdOrder });
    }
  })
);

module.exports = orderRouter;
