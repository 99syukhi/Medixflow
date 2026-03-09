const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'jomelly13',
    database: process.env.DB_NAME || 'medixflow_db',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database verbinding mislukt:', err.message);
    } else {
        console.log('✅ Medixflow is succesvol gekoppeld aan MySQL Workbench!');
        connection.release();
    }
});

module.exports = pool.promise();