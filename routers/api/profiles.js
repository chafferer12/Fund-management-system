//登录和注册 login and register
const express = require("express");
const router = express.Router();
const passport = require("passport");
//引入数据库模块
const { Profile } = require("../../models/Profiles");

//$route GET请求 api/profiles/test
//@desc 返回的请求的json数据
router.get("/test", (req, res) => {
  res.json({ msg: "profile works" });
});

//$route POST请求 api/profiles/add
//@desc 创建信息接口
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};

    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.describe) profileFields.describe = req.body.describe;
    if (req.body.income) profileFields.income = req.body.income;
    if (req.body.expend) profileFields.expend = req.body.expend;
    if (req.body.cash) profileFields.cash = req.body.cash;
    if (req.body.remark) profileFields.remark = req.body.remark;
    console.log(profileFields);
    Profile.build(profileFields)
      .save()
      .then((profile) => {
        res.json(profile);
      });
  }
);

//$route GET请求 api/profiles
//@desc 获取所有信息

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findAll()
      .then((profile) => {
        if (!profile) {
          return res.status(404).json("没有任何内容");
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

//$route GET请求 api/profiles/:id
//@desc 获取单个信息

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ where: { id: req.params.id } })
      .then((profile) => {
        if (!profile) {
          return res.status(404).json("没有任何内容");
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

//$route POST请求 api/profiles/edit/:id
//@desc 编辑信息接口
router.post(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};

    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.describe) profileFields.describe = req.body.describe;
    if (req.body.income) profileFields.income = req.body.income;
    if (req.body.expend) profileFields.expend = req.body.expend;
    if (req.body.cash) profileFields.cash = req.body.cash;
    if (req.body.remark) profileFields.remark = req.body.remark;
    console.log(profileFields);
    Profile.update(profileFields, {
      where: { id: req.params.id },
      returning: true,
    }).then((profile) => res.json(profile));
  }
);

//$route POST请求 api/profiles/delete/:id
//@desc 删除信息接口
router.post(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.destroy({ where: { id: req.params.id } })
      .then((profile) => {
        res.json(profile);
      })
      .catch((err) => res.status(404).json("删除失败!"));
  }
);

module.exports = router;
