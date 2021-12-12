const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Notification = require('../models/Notification')
const genWebToken = require('../utils/jsonWebToken')

//REGISTER works
router.post("/register", async (req, res) => {
  const {email, password, name} = req.body;
  const CheckUserExists = await User.findOne({email});
  if(CheckUserExists) {
    // throw new Error("USer already exists")
    res.status(200).json({message:"user already exists"})
  }
const user = await User.create({email, password,name})
if(user) {
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token:genWebToken(user._id),
    password: user.password,
  })
} else {
  res.status(400).json({
    message: "User could not be created"
  })
}
 
});


//LOGIN needs modification using JWT authentication
router.post("/login", async (req, res) => {
 const {email, password} = req.body;
 const user = await User.findOne({email})
 if(user && (await user.compareUSerPassword(password))) {
   const {password, ...others} =user._doc 

  res.json({

   others,
    token:genWebToken(others),
  })

  }else{
    res.status(400).json({message: "Invalid email or password"})
 }
 
});

module.exports = router;