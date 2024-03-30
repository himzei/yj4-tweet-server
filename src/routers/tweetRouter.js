import express from "express";
import {
  createComment,
  createTweet,
  readTweet,
  getProfileTweet,
} from "../controllers/tweetController";

const tweetRouter = express.Router();

tweetRouter.get("/", readTweet);
tweetRouter.post("/create", createTweet);
tweetRouter.post("/:tweetId/comment", createComment);
tweetRouter.get("/:userId/profile", getProfileTweet);

export default tweetRouter;
