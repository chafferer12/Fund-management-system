const mysql = require("mysql2");
// const { Sequelize } = require("sequelize");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("sys", "root", "lxy010318", {
  host: "localhost",
  dialect: "mysql",
  port: "3306",
  timezone: "+08:00",
});
//连接
sequelize
  .authenticate()
  .then(() => {
    console.log("数据库连接成功！");
  })
  .catch((err) => {
    console.error("连接失败！" + "错误信息：" + err);
  });
module.exports = { Sequelize, sequelize };
