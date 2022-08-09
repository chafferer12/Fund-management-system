const { Sequelize, sequelize } = require("../config/keys");

const User = sequelize.define(
  "User",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    avatar: {
      type: Sequelize.STRING,
    },
    identity: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
);

User.sync().then(() => {
  console.log("模型同步成功！");
});
module.exports = { User };
