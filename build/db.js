"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// mongodb://localhost:27017 (local)
_mongoose["default"].connect("".concat(process.env.DB_URL, "/yj4-twitter"));
var db = _mongoose["default"].connection;
db.on("error", function (error) {
  return console.log(error);
});
db.once("open", function () {
  return console.log("Connected on DB");
});