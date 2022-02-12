import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";
import User from "./user";

const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  subTotalAmount: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0.0
  },
  coupon: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0.0
  },
  tax: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0.0
  },
  amount: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0.0
  },
  isShipped: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isDelivered: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  deliveryAddress: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  deliveryCity: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  deliveryPinCode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  deliveryCountry: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default Order;
