const db = require('../Database/database.js')
const bcrypt = require('bcrypt')

const addResidencia = (req, res) => {
    const { Idinmobiliaria, Tiporesidencia,Nombre,Habitaciones,Baños,Parqueaderos,Ciudad,Barrio,Tiposervicio,
    Unidadcerrada, Areaconstruida,Anoconstruccion,Imagen,Enlace,Precio,Arealote, Estado} = req.body

    let query = `INSERT INTO residencial(ID_Inmobiliaria,TipoR,NombreR,HabitacionR,BanosR,ParqueaderosR,
    CiudadR,BarrioR,Tipo_ServicioR,Unidad_CerradaR,Area_ConstruidaR,Ano_ConstruccionR,ImagenR,EnlaceR,PrecioR,Area_Lote,EstadoR)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

    

    const values = [Idinmobiliaria, Tiporesidencia, Nombre, Habitaciones, Baños, Parqueaderos,Ciudad,Barrio,
    Tiposervicio,Unidadcerrada,Areaconstruida,Anoconstruccion,Imagen,Enlace,Precio,Arealote, Estado]

    db.query(query, values, (err,result) => {
        if(err){
            res.status(500).send("Error al crear la residencia")
            console.log("No se ha podido crear residencia", err);
        }

        res.status(200).send("Residencia creada con exito")
    })

}


const addComercial = (req,res) => {
    const { Idinmobiliaria, Tipocomercial, Nombre, Ciudad, Barrio, Tiposervicio, 
    Areaconstruida, Anoconstruccion, Imagen,Enlace,Precio,Arealote,Estado } = req.body

    let query = `INSERT INTO comercial(ID_inmobiliaria,TipoC,NombreC,CiudadC,BarrioC,Tipo_ServicioC,
    AreaC,Ano_ConstruccionC,ImagenC,EnlaceC,PrecioC,Area_LoteC,EstadoC) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`


    const values = [Idinmobiliaria, Tipocomercial, Nombre, Ciudad, Barrio, Tiposervicio,
    Areaconstruida, Anoconstruccion, Imagen, Enlace, Precio,Arealote, Estado]

    db.query(query, values, (err, result) => {
        if(err){
            res.status(500).send("Error al crear comercial")
            console.log("No se ha podido crear comercial", err);
        }

        res.status(200).send("Comercial creado con exito")
    })
}

// const updateComercial = (req,res) => {
//     const { Tipocomercial, Nombre, Ciudad, Barrio, Tiposervicio, Areaconstruida, Anoconstruccion,
//     Imagen, Enlace, Precio, Arealote, Estado} = req.body

//     const comercialId = req.params.id

//     let query = 
//     `
//     UPDATE comercial 
//     SET
//         TipoC = ?,
//         NombreC = ?,
//         CiudadC = ?,
//         BarrioC = ?,
//         Tipo_ServicioC = ?,
//         AreaC = ?,
//         Ano_ConstruccionC = ?,
//         ImagenC = ?,
//         EnlaceC = ?,
//         PrecioC = ?,
//         Area_LoteC = ?,
//         EstadoC = ?
//     WHERE ID_Comercial = ?
//     `

//     let values = [Tipocomercial, Nombre, Ciudad, Barrio, Tiposervicio, Areaconstruida, Anoconstruccion, Imagen, Enlace,
//     Precio, Arealote, Estado, comercialId]

//     db.query(query, values, (err, result) => {
//         if(err){
//             res.status(500).send(`Error al actualizar comercial con id ${comercialId}`)
//             console.log("No se ha podido actualizar", err);
//         }

//         res.status(200).send("Comercial Actualizado con exito")
//     })
// }



const updateComercial = (req,res) => {
    let comercialId = req.params.id
    let requestBody = req.body

    if (!comercialId) {
        return res.status(400).json({ error: 'ID no proporcionado en la URL' });
    }

    if(Object.keys(requestBody).length === 0){
        const selectQuery = `SELECT * FROM comercial WHERE ID_Comercial = ?`

        db.query(selectQuery, [comercialId], (err,result) => {
            if (err) {
                console.error('Error al seleccionar el registro:', err);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }


            if (result.length === 0) {
                return res.status(404).json({ error: 'Registro no encontrado' });
            }


            return res.json(result[0])
        });
    }else{

        if(requestBody.hasOwnProperty("Tipocomercial")){
            requestBody.TipoC = requestBody.Tipocomercial
            delete requestBody.Tipocomercial
        }

        if(requestBody.hasOwnProperty("Ciudad")){
            requestBody.CiudadC = requestBody.Ciudad
        }

        if(requestBody.hasOwnProperty("Nombre")){
            requestBody.NombreC = requestBody.Nombre
            delete requestBody.Nombre
        }

        if(requestBody.hasOwnProperty("Barrio")){
            requestBody.BarrioC = requestBody.Barrio;
            delete requestBody.Barrio;
        }

        if(requestBody.hasOwnProperty("Tiposervicio")){
            requestBody.Tipo_ServicioC = requestBody.Tiposervicio
            delete requestBody.Tiposervicio
        }

        if(requestBody.hasOwnProperty("Areaconstruida")){
            requestBody.AreaC = requestBody.Areaconstruida
            delete requestBody.Areaconstruida
        }

        if(requestBody.hasOwnProperty("Anoconstruccion")){
            requestBody.Ano_ConstruccionC = requestBody.Anoconstruccion
            delete requestBody.Anoconstruccion
        }

        if(requestBody.hasOwnProperty("Imagen")){
            requestBody.ImagenC = requestBody.Imagen
            delete requestBody.Imagen
        }

        if(requestBody.hasOwnProperty("Enlace")){
            requestBody.EnlaceC = requestBody.Enlace
            delete requestBody.Enlace
        }

        if(requestBody.hasOwnProperty("Precio")){
            requestBody.PrecioC = requestBody.Precio
            delete requestBody.Precio
        }

        if(requestBody.hasOwnProperty("Arealote")){
            requestBody.Area_LoteC = requestBody.Arealote
            delete requestBody.Arealote
        }


        if(requestBody.hasOwnProperty("Estado")){
            requestBody.EstadoC = requestBody.Estado
            delete requestBody.Estado
        }



        // const { Idinmobiliaria, Tipocomercial, Nombre, Ciudad, Barrio, Tiposervicio, 
        // Areaconstruida, Anoconstruccion, Imagen,Enlace,Precio,Arealote,Estado } = req.body

        



        const updateQuery = `UPDATE comercial SET ? WHERE ID_Comercial = ?`


        db.query(updateQuery, [requestBody, comercialId], (err, result) => {
            if(err) {
                console.error('Error al actualizar el registro:', err);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }
        
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Registro no encontrado' });
            }

            let selectQuery = `SELECT * FROM comercial WHERE ID_Comercial = ?`;

            db.query(selectQuery, [comercialId], (err, result) => {
                if (err) {
                    console.error('Error al seleccionar el registro actualizado:', err);
                    return res.status(500).json({ error: 'Error interno del servidor' });
                }
          
                return res.json(result[0]);
            })
        })
    }

    
}

const addUser = async (req, res) => {
    const { Nombreinmobi, Correoinmobi, Telefonoinmobi, Ubicacioninmobi, Estado, Fecharegistro, Numeroidentificacion,
    Representante,Tipoidentificacion, Municipio, Departamento, Telefonorepre, Celular, Correofacturacion, Personaencargada,
    Cargo, Telefonocargo, Contraseña } = req.body

    let query = `INSERT INTO inmobiliaria(Nombre_Inmobiliaria,Correo_Inmobiliaria,Telefono_Inmobiliaria,Ubicacion_Inmobiliaria, 
    Numeroidentificacion,Representante, Tipoidentificacion, Municipio, Departamento, Telefonorepresen,
    Celular,Correofacturacion,Personaencargada,Cargo,Telefonocargo,Contraseña) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

    let contraseñaHash = await bcrypt.hash(Contraseña, 10)

    let values = [Nombreinmobi, Correoinmobi, Telefonoinmobi, Ubicacioninmobi, Numeroidentificacion, Representante,Tipoidentificacion, 
    Municipio, Departamento, Telefonorepre, Celular, Correofacturacion, Personaencargada, Cargo, Telefonocargo, contraseñaHash]

    db.query(query, values, (err, result) => {
        if(err){
            res.status(500).send("Error al crear Usuario")
            console.log("No se ha podido crear Usuario", err);
        }

        res.status(200).send("Usuario creado con exito")
    } )

    
}



module.exports = { addResidencia, addComercial, addUser, updateComercial }