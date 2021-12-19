const jwt = require('jsonwebtoken')
const User = require('../models/User')
const createError = require('http-errors')

const protectRoute = async(req,res, next) => {
    let token = req.headers['x-access-token'];
  
  if (!token){ 
    return res.status(403).send({ 
        auth: false, message: 'No token provided.' 
      });
  }
 
  jwt.verify(token, 'SECRETKEY', (err, payload) => {
    if (err){
      return res.status(500).send({ 
          auth: false, 
          message: 'Fail to Authentication. Error -> ' + err 
        });
    }
    req.body = payload
    next();
  });

}

module.exports = protectRoute