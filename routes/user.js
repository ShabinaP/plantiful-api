const router = require("express").Router();
const User = require('../models/User');
const bcrypt = require("bcrypt");
const Plant = require('../models/Plant')
const genWebToken = require('../utils/jsonWebToken')
const Notification = require('../models/Notification')
//GET USER works
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {
            password,
            ...others
        } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});
//UPDATE USER works
router.put("/:id", async (req, res) => {
       const user = await User.findById(req.user._id);
       if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;     
     
    if(password.body.password) {
          user.password =req.body.password;
      }
 const updatedUser = await use.save()
        res.json({ 
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            tokent:genWebToken(updatedUser_.id)
        })      
    }
        else {
            res.status(404)
            throw new Error("User not found")
        }
});

//DELETE USER this need modification 
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            try {
                await Notification.deleteMany({
                    username: user.username
                });
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User has been deleted...");
            } catch (err) {
                res.status(500).json(err);
            }
        } catch (err) {
            res.status(404).json("User not found!");
        }
    } else {
        res.status(401).json("You can delete only your account!");
    }
});








module.exports = router;