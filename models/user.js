import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  otp: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  profileImageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  isBuyer: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isSeller: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isVerified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isAuthorized: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  token: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  refreshToken: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

export default User;
