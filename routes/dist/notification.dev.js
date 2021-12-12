"use strict";

var router = require("express").Router();

var Notification = require("../models/Notification");

var User = require('../models/User');

var Plant = require('../models/Plant');

var isToday = require('date-fns/isToday');

router.post("/", function _callee(req, res) {
  var _req$body, userId, plantId, frequency, wateringCount, plantName, nextNotification, notification;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, userId = _req$body.userId, plantId = _req$body.plantId, frequency = _req$body.frequency, wateringCount = _req$body.wateringCount, plantName = _req$body.plantName, nextNotification = _req$body.nextNotification;
          _context.next = 3;
          return regeneratorRuntime.awrap(Notification.create({
            userId: userId,
            plantId: plantId,
            frequency: frequency,
            wateringCount: wateringCount,
            plantName: plantName,
            nextNotification: nextNotification
          }));

        case 3:
          notification = _context.sent;

          if (notification) {
            res.status(201).json("Notification created");
          } else {
            res.status(401).json("Error. Please try again.");
          }

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get("/weekly", function _callee2(req, res) {
  var today, day, startOfDay, endOfDay, weeklyNotification, weekly;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          today = new Date();
          day = today.getDay();
          startOfDay = new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString();
          endOfDay = new Date(new Date().setUTCHours(23, 59, 59, 999)).toISOString();
          console.log(today);
          _context2.next = 7;
          return regeneratorRuntime.awrap(Notification.find({
            $and: [{
              frequency: "weekly"
            }, {
              status: "active"
            }, {
              nextNotification: {
                $gte: startOfDay,
                $lt: endOfDay
              }
            }]
          }));

        case 7:
          weeklyNotification = _context2.sent;
          _context2.next = 10;
          return regeneratorRuntime.awrap(Notification.updateMany({
            status: "active",
            frequncey: "weekly",
            nextNotification: {
              $gte: startOfDay,
              $lt: endOfDay
            }
          }, {
            $set: {
              plantName: "data59"
            },
            $inc: {
              wateringCount: 1
            }
          } // $and:[{frequency: "weekly"}, {status:"dead"}, {nextNotification: {$gte: startOfDay,$lt: endOfDay } }],
          // $set:{"plantName":"hello"}
          ));

        case 10:
          weekly = _context2.sent;

          if (weekly) {
            res.status(200).json(weekly);
            console.log(weekly.nextNotification);
          }

          res.status(200).json("Hethee");

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.get('/weekly/get', function (req, res) {});
module.exports = router;