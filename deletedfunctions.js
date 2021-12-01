// from plant functions
//UPDATE Plant   not needed as plant data not muteable by user
// router.put("/:id", async (req, res) => {
//     try {
//         const plant = await Plant.findById(req.params.id);
//         if (Plant.username === req.body.username) {
//             try {
//                 const updatedPlant = await Plant.findByIdAndUpdate(
//                     req.params.id, {
//                         $set: req.body,
//                     }, {
//                         new: true
//                     }
//                 );
//                 res.status(200).json(updatedPlant);
//             } catch (err) {
//                 res.status(500).json(err);
//             }
//         } else {
//             res.status(401).json("");
//         }
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

//CREATE Plant  not need as plant data not muteable by user
// router.post("/add", async (req, res) => {
//     const newPlant = new Plant(req.body); // comes directly from api call
//     try {
//         const plant = await newPlant.save();
//         res.status(200).json(plant);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// //DELETE Plants not needed as plant data not muteable
// router.delete("/:id", async (req, res) => {
//     try {
//         const plant = await Plant.findById(req.params.id);
//         if (plant.username === req.body.username) {
//             try {
//                 await plant.delete();
//                 res.status(200).json("Plant has been deleted successfully...");
//             } catch (err) {
//                 res.status(500).json(err);
//             }
//         } else {
//             res.status(401).json("Plant does not exist");
//         }
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

//get all plants for one particular user (does not work as expected)
// router.get("/userplants/user", async (req, res) => {

//     let user = "61a663a146a4531698aedb60"
//     let plants;
//     try {
//         const userplants = await User.findById(`61a663a146a4531698aedb5f`)
//         const plantsinArray = await userplants.userPlants


//         plants = await Plant.find({
//             _id: {
//                 $in: [plantsinArray]
//             }
//         })
//         res.status(200).json(plants);

//     } catch (error) {
//         res.status(500).json(error);
//     }
// });


//push plant into user plants array
// router.put('/useraddplant', async (req, res) => {
//     const userid = `61a663a146a4531698aedb60`
//     plantid = `61a67737d90627d64e7eeb15`

//     const user = await User.findById(userid);
//     if (user.userPlants.includes(plantid)) {
//         res.status(200).json({
//             message: "you have already like this plant int your collection"
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

// })
