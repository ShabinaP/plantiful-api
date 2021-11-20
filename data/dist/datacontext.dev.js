"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BASE_API = process.env.REACT_APP_BASE_API;
var apikey = process.env.REACT_APP_API_KEY;

var handleGet = function handleGet() {
  var response;
  return regeneratorRuntime.async(function handleGet$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_axios.default.get(BASE_API));

        case 3:
          response = _context.sent;
          console.log(response);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 10:
          console.log("function trigered");

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var _default = handleGet;
exports.default = _default;