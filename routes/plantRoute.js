const router = require("express").Router();
const Plant = require("../models/Plant");
const User = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;
const arrayRemover = require("../utils/arrayremove")

//get all plants from database
router.get("/", async (req, res) => {
    try {
        const plant = await Plant.find().limit(25)
        res.status(200).json(plant)

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

})

//search plant by familyName/ can add more search params  
router.get('/plantname/:latinname', async (req, res) => {
    const latinname = req.params.latinname;  // to get this from body or params
    const result = await Plant.find({
        latinName: new RegExp(latinname, 'i')
    }, )
    res.status(200).json(result)
})

// push plant into user plants array
//adding plant into user plants collection 
router.put('/useraddplant', async (req, res) => {
    const userid = `61a663a146a4531698aedb60`
    plantid = `61a67737d90627d64e7eeb20`

    const user = await User.findById(userid);
    if (user.userPlants.includes(plantid)) {
        res.status(200).json({
            message: "you have already like this plant int your collection"
        })

    } else {
        try {
            user.userPlants.push(plantid);
            user.save()
            res.status(200).json(`Plant added to collection successfully!`)

        } catch (error) {
            res.status(500).json({
                message: "error"
            })
        }
    }

})


//get all plants for one particular user (works)  
 // fetches user plants from dataase using userPlant array 
 // this same method can be used to fetch user wish list from database

 router.get("/userplants/user", async (req, res)=>{
    const userid = "61a663a146a4531698aedb5f" // to come from body or params
    const user = await User.find({_id: userid}).populate('userPlants')
    res.status(200).json(user)
})


//delete plant from user account (works)
//pulls the plant from the userPlanst array, can remove  several plants at the sametime need to pass as array
//removes plant from user plants cooolection 
router.put('/deleteplant', async (req, res) => {
    const userid = `61a663a146a4531698aedb60` // to get this from body or params
    // plantid = [`61a67737d90627d64e7eeb15`,'61a67737d90627d64e7eeb15']
    const userPlants = await User.updateOne({
        _id: userid
    }, {
        $pullAll: {
            userPlants: [`61a67737d90627d64e7eeb18`,'61a67737d90627d64e7eeb19']
        }
    });
    res.status(200).json({
        message: "Plant has been deleted successfully", userPlants
    })
})



module.exports = router;