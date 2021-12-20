const express = require('express');
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const plantRoute = require("./routes/plantRoute");
const likesRoute = require("./routes/likes");
const userAuth = require("./routes/userAuth")
const sendMail = require('./routes/email');
const Agenda = require('agenda');
const axios = require('axios')
const notificationRoute =require("./routes/notification")
const jwt = require('express-jwt')
require('dotenv').config()
const app = express();
const cors = require('cors');
const port = process.env.PORT ||9000;
const MONGOLOCAL = process.env.MONGOLOCAL
const MONOGODB = process.env.MONGODBURL
const NOTIFICATION_CONNECTION= process.env.NOTIFICATION_DB
app.options("*", cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));
app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }))
const testRoutes = require('./routes/testfile')
app.use(express.json());
app.use(cors())
const add = 1
const authenticate = require('./Middleware/authenticator')
const mongoConnectionString =NOTIFICATION_CONNECTION ;
var agenda = new Agenda({
  db: {
    address: mongoConnectionString
  }
});

mongoose
  .connect(MONGOLOCAL, {
    useNewUrlParser: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
app.listen(port, (req,res) => {
console.log(`app is listening on ${port}`);
})
app.use("/users", userRoute);
app.use("/like", likesRoute)
app.use('/auth', userAuth)
app.use("/plants", plantRoute);
app.use("/test", testRoutes)
app.use("/notification", notificationRoute)
app.use('/mail', sendMail)

agenda.define("send Emails", async (job) => {
  const data = await axios.get(`http:localhost/notification/cron-get`)
  const response = await data.data.data
  const plantDetails = await response.map((plantDetail) => {
    return axios.post("http://localhost:5000/mail/mail", {
      recipient: plantDetail.userEmail,
      message: {
        subject: plantDetail.plantName,
        text: `its that of the week, you need to water plant ${plantDetail.plantName}`
      }
    })
  })
  await Promise.all(plantDetails)

  console.log(plantDetails)
});

(async function () {
  await agenda.start()
  await agenda.every("2 minutes", "send Emails")
})()