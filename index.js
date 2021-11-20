const express = require('express');
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const plantRoute = require("./routes/plant");
const likesRoute = require("./routes/likes");
const userAuth = require("./routes/userAuth")
const wishList = require("./routes/wishList")
require('dotenv').config()
const app = express();
const port = process.env.PORT ||3000;
const MONOGODB = process.env.MONGODBURL

app.use(express.json());


mongoose
  .connect(MONOGODB, {
    useNewUrlParser: true,
   
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
app.listen(port, (req,res) => {
console.log(`app is listening on ${port}`);
})
app.use("/users", userRoute);
app.use("/like", likesRoute)
app.use('/auth', userAuth)
app.use("/plants", plantRoute);
