const fs = require("fs");

const Product = require("../Model/ProductsModel");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

mongoose
  .connect(
    "mongodb+srv://Ecommerce:m1964118@cluster0.7n14b.mongodb.net/Ecommerce_1", // "mongodb://localhost:27017/Ecommerce"
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((req, res) => console.log("server conected"))
  .catch((err) => console.log(err));

const products = JSON.parse(fs.readFileSync("./products.json"));
const insertData = async () => {
  try {
    await Product.create(products);
    console.log("data inserted");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "-i") {
  insertData();
} else {
  return;
}
