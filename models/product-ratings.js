import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";
import User from "./user.js";
import Product from "./product.js";

const ProductRatings = sequelize.define("product_rating", {
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
    },
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    },
  },
  rating: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  review: {
    tye: Sequelize.STRING,
    allowNull: false
  }
});

export default BrandProducts;
