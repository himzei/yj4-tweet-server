"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _tweetController = require("../controllers/tweetController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var tweetRouter = _express["default"].Router();
tweetRouter.get("/", _tweetController.readTweet);
tweetRouter.post("/create", _tweetController.createTweet);
tweetRouter.post("/:tweetId/comment", _tweetController.createComment);
tweetRouter.get("/:userId/profile", _tweetController.getProfileTweet);
var _default = exports["default"] = tweetRouter;