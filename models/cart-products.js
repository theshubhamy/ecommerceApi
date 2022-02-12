import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";

import Cart from "./cart.js";
import Product from "./product.js";

const CartProducts = sequelize.define("cart_product", {
  cartId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Cart,
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

export default CartProducts;
