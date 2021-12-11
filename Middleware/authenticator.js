const jwt = require('jsonwebtoken')
const User = require('../models/User')
const createError = require('http-errors')

const protectRoute = async(req,res, next) => {
    if(!req.headers['authorization']) return next(console.log(token))
    
    const token = req.headers['authorization'].split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, (err,payload)=>{
        if(err) {
            return next(res.status(401).json({message: "ypu are not authorized"}))
        }
        req.body = payload
        next()
    })

}

module.exports = protectRoute