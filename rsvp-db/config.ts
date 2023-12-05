const path = require("path");
const file = path.resolve(__dirname, "../.env");
require("dotenv").config({ path: file });

if (
  !process.env.DB_HOST ||
  !process.env.DB_PORT ||
  !process.env.POSTGRES_USER ||
  !process.env.POSTGRES_DB ||
  !process.env.POSTGRES_PASSWORD
) {
  throw new Error("Missing database env vars!");
}
const DB_HOST = process.env.DB_HOST;
const DB_PORT = Number(process.env.DB_PORT);
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_DB = process.env.POSTGRES_DB;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;

export { DB_HOST, DB_PORT, POSTGRES_USER, POSTGRES_DB, POSTGRES_PASSWORD };
export default {
  DB_HOST,
  DB_PORT,
  POSTGRES_USER,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
};
