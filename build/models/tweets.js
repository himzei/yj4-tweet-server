"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var tweetSchema = new _mongoose["default"].Schema({
  content: {
    type: String,
    required: true
  },
  photo: {
    type: String
  },
  writer: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: "Users"
  },
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Comment"
  }],
  createdAt: Date,
  updatedAt: Date
});
tweetSchema.pre("find", function (next) {
  this.populate({
    path: "writer",
    select: "avatar username email"
  });
  this.populate("comments");
  next();
});
var Tweet = _mongoose["default"].model("Tweet", tweetSchema);
var _default = exports["default"] = Tweet;