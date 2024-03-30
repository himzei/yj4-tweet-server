import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: Date,
  updatedAt: Date,
});

tweetSchema.pre("find", function (next) {
  this.populate({ path: "writer", select: "avatar username email" });
  this.populate("comments");
  next();
});

const Tweet = mongoose.model("Tweet", tweetSchema);
export default Tweet;
