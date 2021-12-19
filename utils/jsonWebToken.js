const  jwt = require('jsonwebtoken');
require('dotenv').config()
const jwtSecret = process.env.JWT_SECRET
const generateToken = (user) => {
  return jwt.sign({ user }, jwtSecret, {
    expiresIn: "30d",
  });
};

module.exports= generateToken;