import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";

import Order from "./order.js";
import Product from "./product.js";

const OrderProducts = sequelize.define("order_product", {
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Order,
      key: 'id'
    }
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
});

export default OrderProducts;
