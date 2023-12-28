const express = require('express')
const router = express.Router()
const propiedadesInmuebles = require('../Controllers/InmueblesGetController.js')
const guardarInmuebles = require('../Controllers/InmueblesPostController.js')
const eliminarInmuebles = require('../Controllers/InmueblesDeleteController.js')
// const auth = require('../Controllers/AuthController.js')



//ENDPOINTS GET
router.get('/residenciasFilter', propiedadesInmuebles.residencialFilter)
router.get('/comercialFilter', propiedadesInmuebles.comercialFilter)
router.get('/UserResidencia/:mail', propiedadesInmuebles.residenciaByMail)
router.get('/UserComercial/:mail', propiedadesInmuebles.comercialByMail)
router.get('/residenciaById/:id', propiedadesInmuebles.getResidenciaById)
router.get('/comercialById/:id', propiedadesInmuebles.getComercialById)



//ENDPOINTS POST
router.post('/addResidencia', guardarInmuebles.addResidencia)
router.post('/addComercial', guardarInmuebles.addComercial)
router.post('/addUser', guardarInmuebles.addUser)



//ENDPOINTS PUT
router.put('/updateComercial/:id', guardarInmuebles.updateComercial)
router.put('/updateResidencial/:id', guardarInmuebles.updateResidencial)


//ENDPOINTS DELETE
router.delete('/deleteComercial/:id', eliminarInmuebles.deleteComercial)
router.delete('/deleteResidencial/:id', eliminarInmuebles.deleteResidencia)



// router.put('/updateComercial/:id', guardarInmuebles.updateComercial)
// router.post('/loginUser', auth.verifyUser)

module.exports = router;