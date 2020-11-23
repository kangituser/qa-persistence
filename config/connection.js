const Sequelize = require("sequelize").Sequelize;
require('dotenv').config();

const { DB_NAME, DB_USERNAME, DB_PWD, DB_HOST, DB_PORT, DB_DIALECT } = process.env;

const config = {
  database: DB_NAME,
  username: DB_USERNAME,
  password: DB_PWD,
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
};

const sequelize = new Sequelize(config);

module.exports = sequelize;
