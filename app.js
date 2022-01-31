const express = require("express");
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

//regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

//router middleware
app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", order);

module.exports = app;
