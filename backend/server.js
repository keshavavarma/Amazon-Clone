const Data = require("./Data.js");
const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());
app.get("/api/products", (req, res) => {
  res.send(Data.products);
});

app.listen(5500, () => {
  console.log("serve at http://localhost:5500");
});
