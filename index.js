const express = require("express"); //1
const cors = require("cors"); //2
const app = express();
require("dotenv").config();
const port = 3000;
const bodyParser = require("body-parser"); // pour pouvoir loguer les donnees dans la console du terminal
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("./models/product");

//middleware
app.use(cors());
app.use(bodyParser.json());

//routes
app.post("/api/products", async (req, res) => {
  const product = await createProduct(req.body);
  return res.send({ product });
});

app.put("/api/products/:id", async (req, res) => {
  const id = req.params.id;
  await updateProduct(id, req.body);
  res.send({ message: "modified" });
});

app.get("/api/products", async (req, res) => {
  const result = await getProducts();
  res.send({ products: result });
});

app.get("/api/products/:id", async (req, res) => {
  const id = req.params.id;
  const result = await getProduct(id);
  res.send({ product: result });
});

app.delete("/api/products/:id", async (req, res) => {
  const id = req.params.id;
  await deleteProduct(id);
  res.send({ message: "Deleted !" });
});

app.listen(port, () => {
  console.log("server listen on port " + port);
});
