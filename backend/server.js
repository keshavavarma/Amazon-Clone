const Data = require("./Data.js");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const config = require("./config.js");
const userRouter = require("./routes/userRouter.js");

mongoose
  .connect(config.MONGODB_URL)
  .then(() => {
    console.log(mongoose.connection.readyState, "connected to mongodb.");
  })
  .catch((error) => {
    console.log(error.reason);
  });

const app = express();
app.use(cors());
app.use("/api/users", userRouter);
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
app.listen(5500, () => {
  console.log("serve at http://localhost:5500");
});
