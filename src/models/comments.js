import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },

  createdAt: Date,
  updatedAt: Date,
});

commentSchema.pre("find", function (next) {
  this.populate("writer");
  next();
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
