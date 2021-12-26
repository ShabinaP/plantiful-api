const router = require("express").Router();
const User = require('../models/User');
const bcrypt = require("bcrypt");
const Plant = require('../models/Plant')
const genWebToken = require('../utils/jsonWebToken')
const Notification = require('../models/Notification')
//GET USER works
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('userPlants');
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
// router.get("/user/addplant",async (req, res) => {

//     try {
//         const plant = await User.findById(req.body.userId)
//         res.status(200).json(plant)

//     } catch (error) {
//         res.status(404).json({
//             message: error.message
//         })
//     }

// })

//get all the plants for a particular user 

router.get("user/userplants/:userid", async (req, res)=>{
    // const userid = `61c61842c7f801a551d411eb` // to come from body or params
    const user = await User.findById(req.params.userid).populate('userPlants')
    res.status(200).json(user)
})



router.post('/user/addplant', async(req,res)=>{
    const user= await User.updateOne(
        {_id:req.body.userId}, {
            $addToSet: {userPlants: req.body.plantId}
        }
    )
    res.status(200).json(user)
})

// router.post('/user/addplant', async (req, res) => {
//     const userid = `61c61842c7f801a551d411eb`
//     const plantid = `619ec0a055f8e43130103d86`
//     const user = await User.findById(req.body.userId);

//     if (user.userPlants.includes(req.body.plantId)) {
//         res.status(200).json({
//             message: "you have already have this plant int your collection"
//         })

//     } else {
//         try {
//             user.userPlants.push(plantid);
//             user.save()
//             res.status(200).json(`Plant added to collection successfully!`)

//         } catch (error) {
//             res.status(500).json({
//                 message: "error"
//             })
//         }
//     }

// })findOne

// router.get("/dashboard/:id", async (req, res)=>{
//     const userId = req.body.id
//     const user = await User.findById(userId)
//     res.status(200).json(user)
// })




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