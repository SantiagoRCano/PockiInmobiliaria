// const db = require('../Database/database.js')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')



const verifyUser =  async(req, res) => {
    const { Correo, Contraseña } = req.body

    let query = `SELECT * FROM inmobiliaria WHERE Correo_Inmobiliaria = ?`

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


        if(match){
            let accesToken = jwt.sign(user, process.env.TOKEN_SECRET)
            res.json({accesToken: accesToken})
        }else{
            res.status(401).send("Contraseña incorrecta")
        }
    })
}

module.exports = { verifyUser }