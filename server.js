const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const passport = require("passport");
const expressJwt = require("express-jwt");
const token = require("./config/jwt");
const app = express();

//引入users.js
const users = require("./routers/api/users");
const profiles = require("./routers/api/profiles");
const { JsonWebTokenError } = require("jsonwebtoken");

//使用body-parser中间件
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// passport 初始化
app.use(passport.initialize());
require("./config/passport")(passport);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

//使用router
app.use("/api/users", users);
app.use("/api/profiles", profiles);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
