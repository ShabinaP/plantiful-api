
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
module.exports = router;