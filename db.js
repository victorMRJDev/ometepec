const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    // host: '192.168.0.107',
    // password: '123456789',
    // host: '192.168.1.25', //starlink OMETEPEC usa esta
    
    // host: '192.168.50.185',
    host: '192.168.1.64', //OMETEPEC a no todo bien this is the shit
    user: 'app_user',
    password: 'Ome1234',
    database: 'licencias_db',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  module.exports = pool;
