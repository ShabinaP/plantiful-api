"use strict";

var userData = require('../user.json');

var mailgun = require("mailgun-js");

require('dotenv').config();

var arrayRemove = function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
};

var userEmails = userData.map(function (user) {
  return {
    plantOrigin: user.origin,
    plantId: user.PlantId
  };
});
console.log(userEmails);
module.exports = arrayRemove;
var API = process.env.MAIL_GUN_API;
var DOMAIN = process.env.MAIL_GUN_DOMAIN;
var mg = mailgun({
  apiKey: API,
  domain: DOMAIN
});
var data = {
  from: 'Excited User <jeilani@gmail.com>',
  to: 'jeilani@gmail.com, YOU@YOUR_DOMAIN_NAME',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomness!'
};
mg.messages().send(data, function (error, body) {
  console.log(body);
});
consolo.log(DOMAIN, API);