const router = require("express").Router();
const Plant = require("../models/Plant");
router.put('/:id', async (req, res) => {

    const plant = await Plant.findById(req.params.id);
    if (plant.likedBy.includes(req.body.username)) {
        res.status(200).json({
            message: "you have already like this plant"
        })

    } else {
        try {
            plant.likedBy.push(req.body.username);
            plant.likes++
            plant.save()
            res.status(200).json(`You have like this plant`)

        } catch (error) {
            res.status(500).json({
                message: "error"
            })
        }
    }

})

// get all liked  plants 
router.get("/liked/:user", async (req, res) => {

    let user = "61a663a146a4531698aedb62"
    let plants;
    try {
        plants = await Plant.find({
            likedBy: {
                $in: [user]
            }
        })
        res.status(200).json(plants);

    } catch (error) {
        res.status(500).json(error);
    }
});


// Like count 

//displike count

// dislike plant 
router.put('/dislike/plant', async (req, res) => {
    const userid = `61a663a146a4531698aedb62`
    plantid = `61a67737d90627d64e7eeb16`
    const userPlants = await Plant.updateOne({
        _id: plantid
    }, {
        $pullAll: {
            userId: [userid]
        }
    });
    res.status(200).json({
        message: "Plant dislike registered"
    })

})




module.exports = router;