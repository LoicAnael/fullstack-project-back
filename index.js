const express = require("express"); //1
const cors = require("cors"); //2
const mongoose = require("mongoose"); //3
const app = express();
require("dotenv").config();
const port = 3000;
const bodyParser = require("body-parser"); // pour pouvoir loguer les donnees dans la console du terminal

//schema
const { Schema } = mongoose;
const productSchema = new Schema({
  description: String,
  inStock: Boolean,
  name: String,
  price: Number,
});
const Product = mongoose.model("Product", productSchema);

//mongoose
const login = process.env.LOGIN;
const password = process.env.PASSWORD;
const db = process.env.DB;
const uri = `mongodb+srv://${login}:${password}@cluster0.tgnmnps.mongodb.net/${db}`;
mongoose
  .connect(uri)
  .then(() => console.log("vous etes connectes a mongo "))
  .catch((err) => console.log(err));

//middleware
app.use(cors());
app.use(bodyParser.json());

//routes
app.post("/api/products", (req, res) => {
  console.log(req.body);
  createProduct(req.body);
  return res.send(req.body);
});

app.listen(port, () => {
  console.log("server listen on port " + port);
});

function createProduct({ description, inStock, name, price }) {
  const product = new Product({
    description,
    inStock,
    name,
    price,
  });
  product
    .save()
    .then(() => console.log("produit sauvegarde"))
    .catch((err) => console.log(err));
}
