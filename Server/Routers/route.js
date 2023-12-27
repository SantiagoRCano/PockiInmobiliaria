const express = require('express')
const router = express.Router()
const propiedadesInmuebles = require('../Controllers/InmueblesGetController.js')
const guardarInmuebles = require('../Controllers/InmueblesPostController.js')
// const auth = require('../Controllers/AuthController.js')


router.get('/residenciasFilter', propiedadesInmuebles.residencialFilter)
router.get('/comercialFilter', propiedadesInmuebles.comercialFilter)
router.get('/UserResidencia/:mail', propiedadesInmuebles.residenciaByMail)
router.get('/UserComercial/:mail', propiedadesInmuebles.comercialByMail)
router.get('/residenciaById/:id', propiedadesInmuebles.getResidenciaById)
router.get('/comercialById/:id', propiedadesInmuebles.getComercialById)
router.post('/addResidencia', guardarInmuebles.addResidencia)
router.post('/addComercial', guardarInmuebles.addComercial)
router.post('/addUser', guardarInmuebles.addUser)
router.put('/updateComercial/:id', guardarInmuebles.updateComercial)
router.put('/updateResidencial/:id', guardarInmuebles.updateResidencial)
// router.put('/updateComercial/:id', guardarInmuebles.updateComercial)
// router.post('/loginUser', auth.verifyUser)

module.exports = router;