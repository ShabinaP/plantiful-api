const router = require("express").Router();
const Plant = require("../models/Plant");
const User = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;
const arrayRemover = require("../utils/arrayremove")

//get all plants from database
router.get("/", async (req, res) => {
    try {
        const plant = await Plant.find()
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


//delete plant from user account (works)

router.put('/deleteplant/plant', async (req, res) => {
    const userid = `61a663a146a4531698aedb62` // to get this from body or params
    plantid = `61a67737d90627d64e7eeb16`
    const userPlants = await Plant.updateOne({
        _id: plantid
    }, {
        $pullAll: {
            userId: [userid]
        }
    });
    res.status(200).json({
        message: "Plant has been deleted successfully"
    })

})

//get all plants for one particular user (works)  

router.get("/userplants/user", async (req, res) => {
    let user = "61a663a146a4531698aedb62"//to get this from body or params
    let plants;
    try {
        plants = await Plant.find({
            userId: {
                $in: [user]
            }
        })
        res.status(200).json(plants);

    } catch (error) {
        res.status(500).json(error);
    }
});

//push user into  plant array (works)
router.put('/useraddplant', async (req, res) => {
    const userid = `61a663a146a4531698aedb62`  // to get this from body or params
    plantid = `61a67737d90627d64e7eeb18`
    const plant = await Plant.findById(plantid);
    if (plant.userId.includes(userid)) {
        res.status(200).json({
            message: "you have already have this plant int your collection"
        })
    } else {
        try {
            plant.userId.push(userid);
            plant.save()
            res.status(200).json(`Plant added to collection successfully!`)

        } catch (error) {
            res.status(500).json({
                error: error.message
            })
        }
    }

})



module.exports = router;