const express = require('express')
const router = express.Router()
const propiedadesInmuebles = require('../Controllers/InmueblesGetController.js')
const guardarInmuebles = require('../Controllers/InmueblesPostController.js')
const eliminarInmuebles = require('../Controllers/InmueblesDeleteController.js')
const auth = require('../Controllers/AuthController.js')
const jwt = require('jsonwebtoken')
let token = process.env.TOKEN
let urlWsp = process.env.URLWSMESSAGE



//ENDPOINTS GET
router.get('/residenciasFilter', propiedadesInmuebles.residencialFilter)
router.get('/comercialFilter',propiedadesInmuebles.comercialFilter)
// router.get('/residenciaLead', propiedadesInmuebles.leadResidencia)
// router.get('/comercialLead', propiedadesInmuebles.leadComercial)
// router.get('/comercialUrl/:idC', propiedadesInmuebles.leadComercialUrl)
// router.get('/residenciaUrl/:idR', propiedadesInmuebles.leadResidenciaUrl)
router.get('/UserResidencia/:mail', authenticateToken,propiedadesInmuebles.residenciaByMail)
router.get('/UserComercial/:mail', authenticateToken,propiedadesInmuebles.comercialByMail)
router.get('/residenciaById/:id', authenticateToken, propiedadesInmuebles.getResidenciaById)
router.get('/comercialById/:id', authenticateToken,propiedadesInmuebles.getComercialById)
router.get('/televisores', propiedadesInmuebles.dataTelevisores)
router.get('/productos', propiedadesInmuebles.productos)





//ENDPOINTS POST
router.post('/loginUser', auth.verifyUser)
router.post('/addResidencia', authenticateToken,guardarInmuebles.addResidencia)
router.post('/addComercial', authenticateToken,guardarInmuebles.addComercial)
router.post('/enviarWsp', propiedadesInmuebles.enviarWsp)
router.post('/addUser', guardarInmuebles.addUser)



//ENDPOINTS PUT
router.put('/updateComercial/:id', authenticateToken,guardarInmuebles.updateComercial)
router.put('/updateResidencial/:id', authenticateToken,guardarInmuebles.updateResidencial)


//ENDPOINTS DELETE
router.delete('/deleteComercial/:id', authenticateToken,eliminarInmuebles.deleteComercial)
router.delete('/deleteResidencial/:id', authenticateToken,eliminarInmuebles.deleteResidencia)

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}



module.exports = router;