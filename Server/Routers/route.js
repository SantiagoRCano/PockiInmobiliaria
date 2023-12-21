const express = require('express')
const router = express.Router()
const propiedadesInmuebles = require('../Controllers/InmueblesGetController.js')
const guardarInmuebles = require('../Controllers/InmueblesPostController.js')


router.get('/residenciasFilter', propiedadesInmuebles.residencialFilter)
router.get('/comercialFilter', propiedadesInmuebles.comercialFilter)
router.get('/saludo', propiedadesInmuebles.saludo)
router.post('/addResidencia', guardarInmuebles.addResidencia)
router.post('/addComercial', guardarInmuebles.addComercial)

module.exports = router;