const express = require("express");
const app = express();
const router = require("./router.js");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/payslip");
app.use("/", router);

var port = 8080;
app.listen(port, () => {
  console.log("the server is running on port : " + port);
});
