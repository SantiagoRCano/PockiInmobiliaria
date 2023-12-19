const dotenv = require('dotenv').config()

const PORT = process.env.PORT || 5000
const USER = process.env.USER || 'root'
const DB = process.env.DB || 'inmobiliariademo'
const HOST = process.env.HOST || 'localhost'
const PASSWORD = process.env.PASSWORD || 'rt123'



module.exports = { PORT, USER, DB, HOST, PASSWORD}