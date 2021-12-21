const Agenda = require('agenda');
const axios = require('axios')
var mongoConnectionString = "mongodb://127.0.0.1:27017/notification";

var agenda = new Agenda({
  db: {
    address: mongoConnectionString
  }
});

agenda.define("getuserDetails", async (job) => {
  const data = await axios.get(`notification enbpoint`)
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
  await agenda.every("2 minutes", "getuserDetails")
})()