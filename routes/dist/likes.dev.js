"use strict";

var router = require("express").Router();

var Plant = require("../models/Plant");

router.put('/:id', function _callee(req, res) {
  var plant;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Plant.findById(req.params.id));

        case 2:
          plant = _context.sent;

          if (plant.likedBy.includes(req.body.username)) {
            res.status(200).json({
              message: "you have already like this plant"
            });
          } else {
            try {
              plant.likedBy.push(req.body.username);
              plant.likes++;
              plant.save();
              res.status(200).json("You have like this plant");
            } catch (error) {
              res.status(500).json({
                message: "error"
              });
            }
          }

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}); // get all liked  plants 

router.get("/liked/:user", function _callee2(req, res) {
  var user, plants;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          user = "61a663a146a4531698aedb62";
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Plant.find({
            likedBy: {
              $in: [user]
            }
          }));

        case 4:
          plants = _context2.sent;
          res.status(200).json(plants);
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          res.status(500).json(_context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
module.exports = router;