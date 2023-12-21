const express = require('express')
const router = express.Router()
const propiedadesInmuebles = require('../Controllers/InmueblesGetController.js')
const guardarInmuebles = require('../Controllers/InmueblesPostController.js')
// const auth = require('../Controllers/AuthController.js')


router.get('/residenciasFilter', propiedadesInmuebles.residencialFilter)
router.get('/comercialFilter', propiedadesInmuebles.comercialFilter)
router.get('/getUsers', propiedadesInmuebles.getUsers)
router.post('/addResidencia', guardarInmuebles.addResidencia)
router.post('/addComercial', guardarInmuebles.addComercial)
router.post('/addUser', guardarInmuebles.addUser)
// router.post('/loginUser', auth.verifyUser)

module.exports = router;