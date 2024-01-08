const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createPool({
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PASS,
  user: process.env.DBUSER,
  multipleStatements: true,
});

module.exports = connection;
