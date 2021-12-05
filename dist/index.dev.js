"use strict";

var express = require('express');

var mongoose = require("mongoose");

var userRoute = require("./routes/user");

var plantRoute = require("./routes/plant");

var likesRoute = require("./routes/likes");

var userAuth = require("./routes/userAuth");

var wishList = require("./routes/wishList");

require('dotenv').config();

var app = express();
var port = process.env.PORT || 3000;
var MONOGODB = process.env.MONGODBURL;

var cors = require("cors");

app.options("*", cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}));
app.use(cors({
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
}));
app.use(express.json());
mongoose.connect(MONOGODB, {
  useNewUrlParser: true
}).then(console.log("Connected to MongoDB"))["catch"](function (err) {
  return console.log(err);
});
app.listen(port, function (req, res) {
  console.log("app is listening on ".concat(port));
});
app.use("/users", userRoute);
app.use("/like", likesRoute);
app.use('/auth', userAuth);
app.use("/plants", plantRoute);