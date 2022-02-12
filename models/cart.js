import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";

//models
import User from "./user.js";
import Coupon from "./coupon.js";

const Cart = sequelize.define("cart", {
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
  couponId:{
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: Coupon,
      key: 'id'
    }
  },
  finalAmount:{
    type: Sequelize.DOUBLE,
    allowNull: true,
    defaultValue: 0.0
  },
  amount: {
    type: Sequelize.DOUBLE,
    allowNull: true,
    defaultValue: 0.0
  },
});

export default Cart;
