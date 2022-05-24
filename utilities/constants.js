import dotenv from "dotenv";

dotenv.config();

export const username =
  process.env.NODE_ENV === "DEV" ? "root" : process.env.DB_USERNAME;
export const password =
  process.env.NODE_ENV === "DEV" ? "" : process.env.DB_PASSWORD;
export const host =
  process.env.NODE_ENV === "DEV" ? "localhost" : process.env.DB_HOST;
export const port =
  process.env.NODE_ENV === "DEV" ? "3306" : process.env.DB_PORT;
export const database =
  process.env.NODE_ENV === "DEV"
    ? "ecommerceapi"
    : process.env.DB_DATABASE_NAME;
export const path =
  process.env.NODE_ENV === "DEV"
    ? "F:/ecommerceApi/utilities/ca-certificate.crt"
    : "/home/MicrostudyApi/utilities/microstudy-production-db.crt";
export const env = process.env.NODE_ENV;
