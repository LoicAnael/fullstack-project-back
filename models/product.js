const mongoose = require("mongoose"); //3

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

function createProduct({ description, inStock, name, price }) {
  const product = new Product({
    description,
    inStock,
    name,
    price,
  });
  return product.save();
}

function getProducts() {
  return Product.find({});
}
function getProduct(id) {
  return Product.findById(id);
}
function updateProduct(id, newValues) {
  return Product.updateOne({ _id: id }, { ...newValues, _id: id });
}
function deleteProduct(_id) {
  return Product.deleteOne({ _id });
}
module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
