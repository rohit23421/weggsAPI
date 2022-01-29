const app = require("./app");
const connectwithDB = require("./config/db");
require("dotenv").config();

//connection to DB
connectwithDB();

app.listen(process.env.PORT, () => {
  console.log(`SERVER UP AND RUNNING ON PORT ${process.env.PORT}`);
});
