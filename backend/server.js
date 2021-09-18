const Data = require("./Data.js");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const config = require("./config.js");
const userRouter = require("./routes/userRouter.js");
const orderRouter = require("./routes/orderRouter.js");

mongoose
  .connect(config.MONGODB_URL)
  .then(() => {
    console.log(
      "readyState:",
      mongoose.connection.readyState,
      ",connected to mongodb."
    );
  })
  .catch((error) => {
    console.log(error.reason);
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.get("/api/paypal/clientId", (req, res) => {
  res.send({ clientId: config.PAYPAL_CLIENT_ID });
});
app.get("/api/products", (req, res) => {
  res.send(Data.products);
});
app.get("/api/products/:id", (req, res) => {
  const product = Data.products.find((item) => item._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not found" });
  }
});
app.use((err, req, res, next) => {
  const status = err.name && err.name === "ValidationError" ? 400 : 500;
  res.status(status).send({ message: err.message });
});
app.listen(5500, () => {
  console.log("serve at http://localhost:5500");
});
