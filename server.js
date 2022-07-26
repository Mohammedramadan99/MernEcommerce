const express = require("express");
const app = express();

const product = require("./Routers/ProductRouter");
const userRouter = require("./Routers/userRouter");
const orderRouter = require("./Routers/orderRouter");
const customerRev = require("./Routers/CustomerRevsRoute");
const payment = require("./Routers/paymentRoute");
const errorMiddlerware = require("./middleware/error");

const PostRouter = require("./Routers/PostRoute");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");

require("express-async-errors");

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://Ecommerce:m1964118@cluster0.7n14b.mongodb.net/Ecommerce_1",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((req, res) => console.log("server conected"))
  .catch((err) => console.log(err));

const dotenv = require("dotenv");
dotenv.config();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(require("cors")());
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/api/v1", product);
app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", payment);
app.use("/api/v1", customerRev);
app.use("/api/v1", PostRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
app.use(errorMiddlerware);

cloudinary.config({
  cloud_name: process.env.CLOUDNARY_NAME,
  api_key: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_API_SECRET,
});
app.use(express.static("client/build"));
app.get("*", (req, res) =>
  res.sendFile(`${__dirname}/client/build/index.html`)
);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
