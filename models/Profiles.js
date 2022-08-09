const { Sequelize, sequelize } = require("../config/keys");
const moment=require('moment')

const Profile = sequelize.define("profile", {
  type: {
    type: Sequelize.STRING,
  },
  describe: {
    type: Sequelize.STRING,
  },
  income: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  expend: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cash: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  remark: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    get() {
      return moment(this.getDataValue("createdAt")).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    },
  },
  updatedAt: {
    type: Sequelize.DATE,
    get() {
      return moment(this.getDataValue("updatedAt")).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    },
  },
});

Profile.sync().then(() => {
  console.log("模型同步成功！");
});
module.exports = { Profile };
