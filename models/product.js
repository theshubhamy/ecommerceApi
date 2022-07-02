import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";

//reference models
import User from "./user.js";

const Product = sequelize.define("product", {
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
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  costPrice: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  discount: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  rating: {
    type: Sequelize.DOUBLE,
    defaultValue: 0.0,
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isTrending: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isDealOfTheDay: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

export default Product;
