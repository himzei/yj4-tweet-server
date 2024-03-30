"use strict";

require("dotenv/config");
require("./db");
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("cors"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _connectMongo = _interopRequireDefault(require("connect-mongo"));
var _userRouter = _interopRequireDefault(require("./routers/userRouter"));
var _tweetRouter = _interopRequireDefault(require("./routers/tweetRouter"));
var _multer = _interopRequireDefault(require("multer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// const upload = multer({ dest: "uploads/" });
var upload = (0, _multer["default"])({
  storage: _multer["default"].memoryStorage()
});
var PORT = process.env.PORT;
var corsOptions = {
  origin: ["http://localhost:3000", "https://yj4-tweet.netlify.app"],
  methods: ["GET", "POST"],
  credentials: true // cookie 정보를 사용하기 위해서 클라이언트와서버 통신
};
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use((0, _morgan["default"])("dev"));
app.use((0, _cors["default"])(corsOptions));
app.use((0, _expressSession["default"])({
  name: "session ID",
  secret: process.env.SECRET,
  resave: false,
  // 세션이 변경되지 않아도 항상 저장되도록 설정합니다
  saveUninitialized: false,
  // 초기화되지 않은 세션을 저장소에 저장하지 않도록 설정합니다.
  credentials: true,
  cookie: {
    httpOnly: true,
    // javascript에서 사용이 안되게 하는 옵션
    secure: false,
    // HTTPS를 통해서만 세션 쿠키를 전송하도록 설정합니다.
    maxAge: 1000 * 60 * 60 * 24
  },
  store: _connectMongo["default"].create({
    mongoUrl: process.env.DB_URL + "/yj4-twitter"
  })
}));

// 서브라우팅
app.use("/users", _userRouter["default"]); // 회원가입, 로그인, 카카오로그인
app.use("/tweets", upload.single("file"), _tweetRouter["default"]); // 글쓰기, 수정, 삭제, 읽기, 댓글

app.listen(PORT, function () {
  return console.log("Server is Listening on http://localhost:".concat(PORT));
});