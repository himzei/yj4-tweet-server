"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var commentSchema = new _mongoose["default"].Schema({
  comment: {
    type: String,
    required: true
  },
  writer: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Users"
  },
  createdAt: Date,
  updatedAt: Date
});
commentSchema.pre("find", function (next) {
  this.populate("writer");
  next();
});
var Comment = _mongoose["default"].model("Comment", commentSchema);
var _default = exports["default"] = Comment;