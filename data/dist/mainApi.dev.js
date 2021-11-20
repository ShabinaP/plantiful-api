"use strict";

var axios = require('axios');

require('dotenv').config();

var urlEndPoint = process.env.APIENDPOINT;

var getData = function getData() {
  var plants, data;
  return regeneratorRuntime.async(function getData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(axios.get("https://f7tjuu3dc1.execute-api.us-east-1.amazonaws.com/test/plants"));

        case 2:
          plants = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(plants.data);

        case 5:
          data = _context.sent;

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

getData();