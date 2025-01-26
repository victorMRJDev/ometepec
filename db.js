// require('dotenv').config();
// const mysql = require('mysql2/promise');

// const pool = mysql.createPool({
//     host: process.env.DB_HOST, // IP del servidor MySQL
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT || 3306,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
//   });
  
//   module.exports = pool;

// require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '192.168.0.100', 
    // host: '192.168.50.185',
    user: 'app_user',
    password: '123456789',
    database: 'licencias_db',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  
  module.exports = pool;