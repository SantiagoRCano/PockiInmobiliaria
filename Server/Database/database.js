const mysql = require('mysql')
const credencials = require('../config.js')

const db = mysql.createConnection({
    host: credencials.HOST,
    user:credencials.USER,
    password:credencials.PASSWORD,
    database:credencials.DB
})


db.connect((err) => {
    if(err){
        console.log("Error en la conexion a la base de datos", err);
    }else{
        console.log("Conexion con la base de datos exitosa");
        console.log(credencials.HOST, credencials.DB);
    }
})

module.exports = db;