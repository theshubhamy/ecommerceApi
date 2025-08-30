import Sequelize from "sequelize";
import { username, password, host, port, database } from "./constants.js";

const sequelize = new Sequelize(database, username, password, {
  dialect: "mysql",
  host,
  port,
  logging: false,
  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;
