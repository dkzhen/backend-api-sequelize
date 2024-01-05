const dotenv = require("dotenv");
dotenv.config();

const dbConfig = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DBNAME: "store",
  dialect: "mysql",
};

module.exports = dbConfig;
