const express = require("express");
require("dotenv").config();
const app = express();
// const cookieparser = require("cookie-parser");

//regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// //for cookies middleware
// app.use(cookieParser());

//importing routes here
const user = require("./routes/User");

//router middleware
app.use("/api/v1", user);

module.exports = app;
