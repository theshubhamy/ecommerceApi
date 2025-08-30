import Sequelize from "sequelize";

const sequelize = new Sequelize(
  "ecommercedb",
  "root",
  "",
  {
    dialect: "mysql",
    host: "localhost",
    logging: false,
  },
  {
    pool: {
      max: 100,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export default sequelize;
