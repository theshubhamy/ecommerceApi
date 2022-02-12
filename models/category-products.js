import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";
import Category from "./category.js";
import Product from "./product.js";

const CategoryProducts = sequelize.define("category_product", {
  categoryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Category,
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
},{
  timestamps: false
});

export default CategoryProducts;
