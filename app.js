const express = require("express");
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

//regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//for cookies middleware
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//importing routes here
const user = require("./routes/User");
const product = require("./routes/Product");
const order = require("./routes/Order");
const WhereToBuy = require("./routes/WhereToBuy");
const Admin = require("./routes/Admin");
const Payment = require("./routes/Payment");

//router middleware
app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", order);
app.use("/api/v1", WhereToBuy);
app.use("/api/v1", Admin);
app.use("/api/v1", Payment);

module.exports = app;
