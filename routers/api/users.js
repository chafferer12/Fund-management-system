//登录和注册 login and register
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const passport = require("passport");
//引入数据库模块
const { User } = require("../../models/User");

//$route GET请求 api/users/test
//@desc 返回的请求的json数据
router.get("/test", (req, res) => {
  res.json({ msg: "login works" });
});

//$route POST请求 api/users/register
//@desc 返回的请求的json数据
router.post("/register", (req, res) => {
  // console.log(req.body);

  // const params = req.body;
  const { email, password, name,identity } = req.body;
  
  //根据客户端传递过来的 邮箱查询数据库
  User.findOne({ where: { email } }).then((user) => {
    if (user) {
      return res.status(400).json("邮箱已被注册！" );
    } else {
      let cipher = crypto.createCipheriv(
        "aes-128-cbc",
        "123456789abcdefg",
        "abcdefg123456789"
      );
      let newPWD =
        cipher.update(password, "binary", "base64") + cipher.final("base64");
      const newUser = User.build({ name, email, password,identity });
      console.log(newUser.dataValues.password);
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.dataValues.password, salt, function (err, hash) {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
  //判断
});

//$route POST请求 api/users/login
//@desc 返回token jwt pasport
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  //查询数据库

  console.log(User.id);
  User.findOne({ where: { email } }).then((user) => {
    if (!user) {
      return res.status(404).json("用户不存在！" );
    }

    //密码匹配
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const rule = { id: user.id, name: user.name,identity:user.identity };
        jwt.sign(rule, "secret", { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;
          res.json({ success: true, token: "Bearer " + token });
        });
        // res.json({ msg: "success" });
      } else {
        return res.status(400).json( "密码错误！");
      }
    });
  });
});

// $route GET请求 api/users/current
// @desc return current user
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      identity:req.user.identity
    });
  }
);

module.exports = router;
