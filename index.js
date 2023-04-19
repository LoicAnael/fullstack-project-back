const express = require("express"); //1
const cors = require("cors"); //2
const mongoose = require("mongoose"); //3
const app = express();
const port = 3000;
const bodyParser = require("body-parser"); //4

//schema
const { Schema } = mongoose;
const productSchema = new Schema({
  description: String,
  inStock: Boolean,
  name: String,
  price: Number,
});
const Product = mongoose.model("Product", productSchema);
const product1 = new Product();
product1
  .save()
  .then(() => console.log("nouveau produit test"))
  .catch((err) => console.log(err));

//mongoose
mongoose
  .connect(
    "mongodb+srv://loic-anael:qW4yUjXNjxugCltv@cluster0.tgnmnps.mongodb.net/test"
  )
  .then(() => console.log("vous etes connectes a mongo "))
  .catch((err) => console.log(err));

//middleware
app.use(cors());
app.use(bodyParser.json());

//routes
app.post("/api/products", (req, res) => {
  console.log(req.body);
  return res.send(req.body);
});

app.listen(port, () => {
  console.log("server listen on port " + port);
});
