const express = require('express');
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const plantRoute = require("./routes/plant");
const likesRoute = require("./routes/likes");
const userAuth = require("./routes/userAuth")
const wishList = require("./routes/wishList")
require('dotenv').config()
const app = express();
const cors = require('cors');
const port = process.env.PORT ||5000;
const MONGOLOCAL = process.env.MONGOLOCAL
const MONOGODB = process.env.MONGODBURL || "mongodb+srv://muudi:dObmtV3s9ImGf5bF@cluster0.qvyx8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
app.options("*", cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));
app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }))

app.use(express.json());
app.use(cors())


mongoose
  .connect(MONGOLOCAL, {
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

