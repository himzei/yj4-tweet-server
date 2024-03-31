import bcrypt from "bcrypt";
import Users from "../models/users";

export const userRegister = async (req, res) => {
  try {
    const {
      body: { username, password, email },
    } = req;

    const hashedPassword = bcrypt.hashSync(password, 10);

    await Users.create({
      username,
      password: hashedPassword,
      email,
      createdAt: new Date(),
    });
  } catch (error) {
    console.log(error);
  }
};

export const userLogin = async (req, res) => {
  try {
    const {
      body: { username, password },
    } = req;

    const user = await Users.findOne({ username });
    if (!user) {
      return res.send({ result: false, message: "해당하는 유저가 없습니다!" });
    }
    const ok = bcrypt.compareSync(password, user.password);

    if (ok) {
      req.session.save(() => {
        req.session.user = {
          avatar: user?.avatar,
          username: user.username,
          email: user.email,
          id: user._id,
        };

        const data = req.session;
        console.log("유저로그인", data.user.id.toString());

        res.cookie("tweetIn", data.user.id.toString(), process.env.SECRET);
        res.send({ result: true, data });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const userLogout = async (req, res) => {
  try {
    req.session.destroy(() => {
      res.send({ result: true, message: "로그아웃 성공" });
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginSuccess = async (req, res) => {
  try {
    const {
      session: { user },
      cookies,
    } = req;

    const userId = user?.id.toString();

    console.log("유저아이디: ", userId);
    console.log("쿠키정보: ", cookies.tweetIn);
    console.log(userId === cookies?.tweetIn);

    if (req.cookies?.tweetIn === userId) {
      res.send({ result: true, user, isLogin: true });
    } else {
      res.send({ result: true, isLogin: false });
    }
  } catch (error) {
    console.log(error);
    res.send({ result: false });
  }
};

export const kakaoLogin = async (req, res) => {
  const {
    query: { code },
  } = req;

  // Access Token 받는 코드
  const KAKAO_BASE_PATH = "https://kauth.kakao.com/oauth/token";
  const config = {
    grant_type: "authorization_code",
    client_id: process.env.KAKAO_CLIENT_ID,
    code,
    redirect_uri: process.env.KAKAO_REDIRECT_URI,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${KAKAO_BASE_PATH}?${params}`;

  const data = await fetch(finalUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });
  const tokenRequest = await data.json();

  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const userRequest = await fetch("https://kapi.kakao.com/v2/user/me", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${access_token}`,
        property_keys: ["kakao_account.email"],
      },
    });
    const userData = await userRequest.json();

    const {
      kakao_account: {
        profile: { nickname, thumbnail_image_url },
        email,
      },
    } = userData;

    const user = await Users.findOne({ email });

    if (user) {
      // 로그인
      req.session.save(() => {
        req.session.user = {
          avatar: thumbnail_image_url,
          username: nickname,
          email,
          id: user._id,
        };
        const data = req.session;

        return res.send({
          result: true,
          data,
          message: "로그인 성공!",
          isLogin: true,
        });
      });
    } else {
      const user = await Users.create({
        username: email,
        avatar: thumbnail_image_url,
        email,
        createdAt: new Date(),
      });
      req.session.save(() => {
        req.session.user = {
          avatar: user.avatar,
          username: user.email,
          email: user.email,
          id: user._id,
        };
        const data = req.session;

        return res.send({
          result: true,
          message: "회원가입 성공!",
          isLogin: true,
          data,
        });
      });
    }
  }
};
