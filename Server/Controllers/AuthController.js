const db = require('../Database/database.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



//Verificar usuario y dar token

const verifyUser =  async(req, res) => {
    const { Correo, Contraseña } = req.body

    let query = `SELECT ID_Inmobiliaria,Nombre_Inmobiliaria,Correo_Inmobiliaria,Ubicacion_Inmobiliaria,
    Estado,Fecharegistro,Numeroidentificacion,Representante,Tipoidentificacion,Municipio,Departamento,
    Telefonorepresen,Celular,Correofacturacion,Personaencargada,Cargo,Telefonocargo,Contraseña 
    FROM inmobiliaria WHERE Correo_Inmobiliaria = ?`

    db.query(query, [Correo], async (err, results) => {
        if(err){
            console.error('Error en la consulta:', err);
            res.status(500).send('Error en el servidor');
            return;
        }

        if(results.length === 0 || Contraseña == null){
            res.status(401).send('Usuario Invalido')
            return
        }

        let user = { correo: Correo, contraseña: Contraseña}


        const cleanPassword = results[0].Contraseña

        let match = await bcrypt.compare(Contraseña, cleanPassword)

        let answer = results.map(item => {
            delete item.Contraseña
            return item
        })

        if(match){
            let accesToken = jwt.sign(user, process.env.ACCESS_TOKEN)
            res.json({ accesToken, answer })
        }else{
            res.status(401).send("Contraseña incorrecta")
        }
    })
}



module.exports = { verifyUser }