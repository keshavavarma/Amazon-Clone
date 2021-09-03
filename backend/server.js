const Data = require("./Data.js");
const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());
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
