import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";
import Brand from "./brand.js";
import Product from "./product.js";

const BrandProducts = sequelize.define("brand_product", {
  brandId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Brand,
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

export default BrandProducts;
