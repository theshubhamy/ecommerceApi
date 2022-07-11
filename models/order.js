import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";
import User from "./user";

const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  useremail: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  subTotalAmount: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0.0,
  },
  orderedProduct: {
    
  },
  payableAmount: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0.0,
  },
  isOrdered: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isOrderConfirmed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isShipped: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isDelivered: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
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
