const router = require("express").Router();
const Notification = require("../models/Notification")
const addWeeks = require('date-fns/addWeeks')
const today = new Date()
const startOfDay = new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
const endOfDay = new Date(new Date().setUTCHours(23, 59, 59, 999)).toISOString()

router.post("/", async (req, res) => {
    const {
        userId,
        plantId,
        frequency,
        wateringCount,
        plantName,
        nextNotification,
        status,
        userEmail
    } = req.body
    const notification = await Notification.create({
        userId: userId,
        plantId: plantId,
        frequency: frequency,
        wateringCount: wateringCount,
        plantName: plantName,
        nextNotification: nextNotification,
        status: status,
        userEmail: userEmail
    })
    if (notification) {
        res.status(201).json("Notification created")
    } else {
        res.status(401).json("Error. Please try again.")
    }
})

// get items 

router.get("/weekly", async (req, res) => {
    try {
        const weeklyNotification = await Notification.find({
            $and: [{
                    frequency: "two weekly"
                },
                {
                    status: "dead"
                },
                {
                    nextNotification: {
                        $gte: startOfDay,
                        $lt: endOfDay
                    }
                }
            ]
        })

        res.status(200).json(weeklyNotification)


    } catch (error) {
        return error


    }


})
router.get("/update/weekly", async (req, res) => {
    try {
        const weeklyNotification = await Notification.find({
            $and: [{
                    frequency: "two weekly"
                },
                {
                    status: "muted"
                },
                {
                    nextNotification: {
                        $gte: startOfDay,
                        $lt: endOfDay
                    }
                }
            ]
        }).updateMany({

            $set: {
                nextNotification: addWeeks(today, 1),
                watered: "false",
                lastNotification: today
            },
            $inc: {
                notificationCount: 1
            }
        })
        res.status(200).json(weeklyNotification)

    } catch (error) {
        return error

    }

})

// update watered field  from user end(front end)
router.get("/watered", async (req, res) => {
    const userId = req.body.userId
    const plantId = req.body.plantId
    const filter = {
        userId: userId,
        plantId: plantId
    }
    const update = {
        watered: "true",
        $inc: {
            wateringCount: 1
        }
    }
    try {
        const watered = await Notification.findOneAndUpdate(filter, update)
        res.status(200).json(watered)

    } catch (error) {
        return error

    }
})

// mute notification from user end(front end)
router.put("/status/update", async (req, res) => {
    const userId = req.body.userId
    const plantId = req.body.plantId
    const notiticationStatus = req.body.status
    const filter = {
        userId: userId,
        plantId: plantId

    }
    const update = {
        status: notiticationStatus,
        
    }
    try {
        const watered = await Notification.findOneAndUpdate(filter, update)
        res.status(200).json(watered)

    } catch (error) {
        return error

    }
})









module.exports = router;