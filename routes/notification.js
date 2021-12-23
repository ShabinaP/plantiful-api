const router = require("express").Router();
const Notification = require("../models/Notification")
const addWeeks = require('date-fns/addWeeks')
const addMonth = require('date-fns/addMonths')
const today = new Date()
const startOfDay = new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
const endOfDay = new Date(new Date().setUTCHours(23, 59, 59, 999)).toISOString()

router.post("/", async (req, res) => {
    const {
        userId,
        plantId,
        frequency, 
        plantName,
        wateringCount,
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
                    status: "active"
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

router.put("/update/cron-set", async (req, res) => {
    try {
        const weeklyNotification = await Notification.find({
            $and: [{
                    status: "active"
                },
                {
                    nextNotification: {
                        $gte: startOfDay,
                        $lt: endOfDay
                    }
                }
            ]
        }).updateMany({},
            
             [{
                $set: {
                    nextNotification: {
                        $switch: {
                            branches: [{
                                    case: {
                                        $eq: ["$frequency", 'weekly']
                                    },
                                    then: addWeeks(today, 1)
                                },
                                {
                                    case: {
                                        $eq: ["$frequency", 'two weekly']
                                    },
                                    then: addWeeks(today, 2)
                                },
                                {
                                    case: {
                                        $eq: ["$frequency", 'monthly']
                                    },
                                    then: addMonth(today, 1)
                                }
                            ],
                            default: ""
                        }
                    }
                     

                }
              

              
            }

      
        ]            
       
           
        )  
       
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
        const updatedStatus = await Notification.findOneAndUpdate(filter, update)
        res.status(200).json(updatedStatus)

    } catch (error) {
        return error

    }
})









module.exports = router;