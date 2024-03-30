import express from "express";
import {
  kakaoLogin,
  loginSuccess,
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.get("/login/success", loginSuccess);
userRouter.post("/logout", userLogout);
userRouter.get("/socials/kakao", kakaoLogin);

export default userRouter;
