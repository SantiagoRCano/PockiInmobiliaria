const dotenv = require('dotenv').config()

const SQLPORT = process.env.MYSQLPORT || '3000'
const USER = process.env.USER || 'root'
const DB = process.env.DB || 'inmobiliariademo'
const HOST = process.env.HOST || 'localhost'
const PASSWORD = process.env.PASSWORD || 'rt123'
const PORT = process.env.PORT || 3000



module.exports = { PORT, USER, DB, HOST, PASSWORD, SQLPORT}