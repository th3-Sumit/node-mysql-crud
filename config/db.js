const mysql = require("mysql2/promise")
const dotenv = require('dotenv')

dotenv.config();

const username = process.env.username;
const password = process.env.password;
const database = process.env.database;

const mySqlPool = mysql.createPool({
    host: 'localhost',
    user: username,
    password: password,
    database: database,
    // waitForConnections: true,
    // connectionLimit: 10,
    // maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    // idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    // queueLimit: 0,
    // enableKeepAlive: true,
    // keepAliveInitialDelay: 0,
});

const createUserPool = mysql.createPool({
  host: 'localhost', 
  user: username, 
  password: password, 
  database: database,
})

module.exports = { mySqlPool, createUserPool };