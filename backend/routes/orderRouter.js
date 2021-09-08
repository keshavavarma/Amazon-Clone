const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Order = require("../models/Order.js");
const util = require("../util.js");

const orderRouter = express.Router();
orderRouter.get(
  "/:id",
  util.isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order not found" });
    }
  })
);
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
        .send({ message: "New Order Created", order: createdOrder });
    }
  })
);

orderRouter.put(
  "/:id/pay",
  util.isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.payment.paymentResult = {
        orderID: req.body.orderID,
        payerID: req.body.payerID,
        paymentID: req.body.paymentID,
      };
      const updatedOrder = await order.save();
      res.send({ message: "Order paid", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);
module.exports = orderRouter;
