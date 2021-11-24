const router = require("express").Router();
const Plant = require("../models/Plant");
const User = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;

//CREATE Plant
router.post("/add", async (req, res) => {
    const newPlant = new Plant(req.body); // comes directly from api call
    try {
        const plant = await newPlant.save();
        res.status(200).json(plant);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE Plant
router.put("/:id", async (req, res) => {
    try {
        const plant = await Plant.findById(req.params.id);
        if (Plant.username === req.body.username) {
            try {
                const updatedPlant = await Plant.findByIdAndUpdate(
                    req.params.id, {
                        $set: req.body,
                    }, {
                        new: true
                    }
                );
                res.status(200).json(updatedPlant);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE Plants
router.delete("/:id", async (req, res) => {
    try {
        const plant = await Plant.findById(req.params.id);
        if (plant.username === req.body.username) {
            try {
                await plant.delete();
                res.status(200).json("Plant has been deleted successfully...");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("Plant does not exist");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET Plant
router.get("/:user", async (req, res) => {
    try {
        const plant = await Plant.findOne(req.params.username);
        res.status(200).json(plant);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL Plants for a specific user
router.get("/", async (req, res) => {
    const username = req.query.username;

    let plants; 
    try {
        plants = await Plant.find()
        res.status(200).json(plants);
        
    } catch (error) {
        res.status(500).json(error);
    }


    try {
        let plants;
        if (username) {
            plants = await Plant.find({
                username
            });
        } else {
            plants = await Plant.find();
        }
        res.status(200).json(plants);
    } catch (err) {
        res.status(500).json(err);
    }
});






module.exports = router;