const axios = require('axios')
require('dotenv').config();
const nodemailer = require('nodemailer')
const log = console.log;

// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER || 'jeilani@gmail.com', // TODO: your gmail account
        pass: process.env.PASSWORD || '07868613816Za@gm' // TODO: your gmail password
    }
});

// Step 2
let mailOptions = {
    from: 'jeilani@gmail.com', // TODO: email sender
    to: 'jeilani@gmail.com', // TODO: email receiver
    subject: 'Nodemailer - Test',
    text: 'Wooohooo it works!!'
};

// Step 3
transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        return log('Error occurs');
    }
    return log('Email sent!!!');
});




// const emails = await weeklyNotification.map(email => {
//     return {
//         email: email.userEmail,
//         plantName: email.plantName
//     }
// })
// console.log(emails)