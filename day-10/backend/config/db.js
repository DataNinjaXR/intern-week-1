const mysql = require("mysql2/promise");
const fs = require("fs");
require("dotenv").config();

let sslConfig;

if (process.env.DB_SSL_CA) {
  const ca = process.env.DB_SSL_CA;

  sslConfig = {
    ca: ca.includes("-----BEGIN CERTIFICATE-----")
      ? ca
      : fs.readFileSync(ca, "utf8"),
    rejectUnauthorized: true,
  };
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  ssl: sslConfig,
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;