"use strict";

var express = require('express');

var router = express.Router();

var emailUtil = require('../utils/email.utils');

var sendEmail = emailUtil.sendEmail;
router.post('/mail', function _callee(req, res, next) {
  var _req$body, recipient, message;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, recipient = _req$body.recipient, message = _req$body.message;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(sendEmail(recipient, message));

        case 4:
          res.json({
            message: 'you message has been sent'
          });
          _context.next = 7;
          return regeneratorRuntime.awrap(next());

        case 7:
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          _context.next = 13;
          return regeneratorRuntime.awrap(next(_context.t0));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
module.exports = router;