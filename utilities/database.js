import fs from "fs";
import Sequelize from "sequelize";
import {
  username,
  password,
  host,
  port,
  database,
  path,
  env,
} from "./constants.js";

const ca = fs.readFileSync(path).toString();

let sequelizeOptions;

if (env === "DEV") {
  sequelizeOptions = {
    dialect: "mysql",
    username,
    password,
    host,
    port,
    database,
    logging: false,
  };
} else {
  sequelizeOptions = {
    dialect: "mysql",
    username,
    password,
    host,
    port,
    database,
    dialectOptions: {
      ssl: {
        ca,
      },
    },
    logging: false,
  };
}

const sequelize = new Sequelize(sequelizeOptions);

export default sequelize;
// import Sequelize from "sequelize";

// const sequelize = new Sequelize(
//   "ecommercedb",
//   "root",
//   "",
//   {
//     dialect: "mysql",
//     host: "localhost",
//     logging: false,
//   },
//   {
//     pool: {
//       max: 100,
//       min: 0,
//       acquire: 30000,
//       idle: 10000,
//     },
//   }
// );

// export default sequelize;
