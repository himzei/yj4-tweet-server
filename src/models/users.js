import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  mobile: String,
  avatar: String,
  createdAt: Date,
  updatedAt: Date,
});

const Users = mongoose.model("Users", usersSchema);
export default Users;
