const mysql = require('mysql')
const credencials = require('../config.js')

const db = mysql.createConnection({
    host: credencials.HOST,
    user:credencials.USER,
    password:credencials.PASSWORD,
    database:credencials.DB,
    port: credencials.SQLPORT
})


db.connect((err) => {
    if(err){
        console.log("Error en la conexion a la base de datos", err);
    }else{
        console.log("Conexion con la base de datos exitosa");
    }
})

module.exports = db;