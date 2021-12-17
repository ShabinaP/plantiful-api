const  jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ user }, "SECRETKEY", {
    expiresIn: "30d",
  });
};

module.exports= generateToken;