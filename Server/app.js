const express = require('express');
const bodyParse = require('body-parser')
const rutas = require('./Routers/route.js')
const cors = require('cors')

const config = require('./config.js')
const app = express()

const data = require('./Database/database.js')

app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended:true}))
app.use(cors())

app.use('/api', rutas)

app.listen(config.PORT, () => {
    console.log(`Corriendo con exito en el puerto ${config.PORT}`);
})