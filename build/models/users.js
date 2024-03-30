"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var usersSchema = new _mongoose["default"].Schema({
  username: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  mobile: String,
  avatar: String,
  createdAt: Date,
  updatedAt: Date
});
var Users = _mongoose["default"].model("Users", usersSchema);
var _default = exports["default"] = Users;