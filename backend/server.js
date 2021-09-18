const Data = require("./Data.js");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const config = require("./config.js");
const userRouter = require("./routes/userRouter.js");
const orderRouter = require("./routes/orderRouter.js");
const path = require("path");

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
app.use((err, req, res, next) => {
  const status = err.name && err.name === "ValidationError" ? 400 : 500;
  res.status(status).send({ message: err.message });
});
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

// serve static assets in production

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log("serve at http://localhost:5500");
});
