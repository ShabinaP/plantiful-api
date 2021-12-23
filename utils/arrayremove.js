// const userData = require('../user.json')
// const mailgun = require("mailgun-js");
// require('dotenv').config()
// const arrayRemove = function (arr, value) {
// const axios = require('axios')
//     return arr.filter(function (ele) {
//         return ele != value;
//     });
// }


// const userEmails = userData.map((user) => {
//     return {
//         plantOrigin: user.origin,
//         plantId: user.PlantId
//     }
// })

// console.log(userEmails)

// module.exports = arrayRemove;
// const API = process.env.MAIL_GUN_API
// const DOMAIN = process.env.MAIL_GUN_DOMAIN
// const mg = mailgun({
//     apiKey: API,
//     domain: DOMAIN
// });
// const data = {
//     from: 'Excited User <process.env.SENDER-EMAIL>',
//     to: 'info@eastberry.io, YOU@YOUR_DOMAIN_NAME',
//     subject: 'Hello',
//     text: 'Testing some Mailgun awesomness!'
// };
// mg.messages().send(data, function (error, body) {
//     console.log(body);
// });
// console.log(DOMAIN, API)
//  const user = require('../user.json')
// let URLs= ["https://jsonplaceholder.typicode.com/posts/1", "https://jsonplaceholder.typicode.com/posts/2", "https://jsonplaceholder.typicode.com/posts/3"]

// const getAllData = (user){
//   return   user.map((user)=> {
//         return  {
//         plantOrigin: user.origin,
//           plantId: user.PlantId
//         }

//     })
  

// }



// const userEmails = user.map((user) => {
//     return {
//         plantOrigin: user.origin,
//         plantId: user.PlantId
//     }
// })


// userEmails.forEach(element => console.log(element.plantOrigin));


// function fetchData(URL) {
//   return axios
//     .get(URL)
//     .then(function(response) {
//       return {
//         success: true,
//         data: response.data
//       };
//     })
//     .catch(function(error) {
//       return { success: false };
//     });
// }
// console.log(getAllData(user))
  // userEmails.forEach(element => console.log(element.plantOrigin));


  //   await  axios.post('http://localhost:4000/mail/mail',{
  //   recipient: firstUSer.userEmail,
  //   message:{
  //       subject: firstUSer.plantName,
  //       text: `${firstUSer.plantName} Need watering`,
  //   }
  
  // }).then(function (response) {
  //   console.log(response)
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
// exports.handler = (event, context, callback) => {
// sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//     to: "jeilani@gmail.com",
//     from: "info@eastberry.io",
//     subject: "test",
//     text: "test",
// };
// sendgrid.send(msg);
// callback(null, 'Message Sent');
// }