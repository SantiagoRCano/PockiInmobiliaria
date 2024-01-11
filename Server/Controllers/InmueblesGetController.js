const { query } = require('express')
const db = require('../Database/database.js')
const { json } = require('body-parser')





const residencialFilter = (req,res) => {
    let query = 
    `
    SELECT residencial.ID_Inmobiliaria,ID_Residencial,Nombre_Inmobiliaria,Correo_Inmobiliaria,Telefono_Inmobiliaria,TipoR, NombreR, HabitacionR,BanosR,
    ParqueaderosR,CiudadR,Celular,BarrioR,Unidad_CerradaR,Area_ConstruidaR,PrecioR,Ano_ConstruccionR,Tipo_ServicioR,
    Area_Lote,ImagenR,EnlaceR,EstadoR
    FROM inmobiliaria 
    INNER JOIN residencial ON residencial.ID_Inmobiliaria = inmobiliaria.ID_Inmobiliaria 
    `

    const { Tiporesidencia,Habitaciones,Baños,Parqueaderos,Ciudad,Barrio,Tiposervicio,Unidadcerrada,
    Areaconstruida,Anoconstruccion,Presupuesto,Estado,Arealote} = req.body

    query += Tiporesidencia != null && Tiporesidencia.length > 0 ? ` AND TipoR LIKE '%${Tiporesidencia}%'` : ""
    query += Habitaciones != null ? ` AND HabitacionR >= ${Habitaciones}` : "" 
    query += Baños != null ? ` AND BanosR >= ${Baños}` : ""
    query += Parqueaderos != null ? ` AND ParqueaderosR >= ${Parqueaderos}` : ""
    query += Ciudad != null && Ciudad.length > 0 ? ` AND CiudadR LIKE '%${Ciudad}%'` : ""
    query += Barrio != null && Barrio.length > 0 ? ` AND BarrioR LIKE '%${Barrio}%'` : ""
    query += Tiposervicio != null && Tiposervicio.length > 0 ? ` AND Tipo_ServicioR LIKE '%${Tiposervicio}%'` : ""
    query += Unidadcerrada != null && Unidadcerrada.length > 0 ? ` AND Unidad_CerradaR LIKE '%${Unidadcerrada}%'` : ""
    query += Areaconstruida != null ? ` AND Area_ConstruidaR >= ${Areaconstruida}` : ""
    query += Anoconstruccion != null ? ` AND Ano_ConstruccionR >= ${Anoconstruccion}` : ""
    query += Presupuesto != null ? ` AND PrecioR <= ${Presupuesto}` : ""



    if(Arealote != 0 && Arealote != null){
        query += ` AND Area_Lote >= ${Arealote}`
    }else if(Arealote == 0 && Arealote != null){
        query += ` AND Area_Lote = ${Arealote}`
    }

    db.query(query, (err,result) => {
        if(err){
            console.log(`No se ha podido obtener las residencias`, err);
            res.status(500).json({ error: "Error al obtener residencias"})
            return
        }
        res.json(result)
    })

}







const comercialFilter = (req, res) => {
    let query =
    `
    SELECT comercial.ID_Inmobiliaria,ID_Comercial,Nombre_Inmobiliaria,Correo_Inmobiliaria,Telefono_Inmobiliaria,Celular,TipoC,NombreC,CiudadC,BarrioC,AreaC,EstadoC,PrecioC,Ano_ConstruccionC,Tipo_ServicioC,
    Area_LoteC,ImagenC,EnlaceC
    FROM inmobiliaria
    INNER JOIN comercial ON comercial.ID_Inmobiliaria = inmobiliaria.ID_Inmobiliaria 
    `

    const {Tipocomercial, Ciudad, Barrio,Tiposervicio,Areaconstruccion,Anoconstruccion,Presupuesto,Arealote} = req.body

    query += Tipocomercial != null && Tipocomercial.length > 0 ? ` AND TipoC LIKE '%${Tipocomercial}%'` : ""
    query += Ciudad != null && Ciudad.length > 0 ? ` AND CiudadC LIKE '%${Ciudad}%'` : ""
    query += Barrio != null && Barrio.length > 0 ? ` AND BarrioC LIKE '%${Barrio}%'` : ""
    query += Tiposervicio != null && Tiposervicio.length > 0 ? ` AND Tipo_ServicioC LIKE '%${Tiposervicio}%'`: ""
    query += Areaconstruccion != null ? ` AND AreaC >= ${Areaconstruccion}` : ""
    query += Anoconstruccion != null ? ` AND Ano_ConstruccionC >= ${Anoconstruccion}` : ""
    query += Presupuesto != null ? ` AND PrecioC <= ${Presupuesto}` : ""

    if(Arealote != 0 && Arealote != null){
        query += ` AND Area_LoteC >= ${Arealote}`
    }else if(Arealote == 0 && Arealote != null){
        query += ` AND Area_LoteC = ${Arealote}`
    }

    db.query(query, (err,result) => {
        if(err){
            console.log(`No se ha podido obtener los inmuebles comerciales`, err);
            res.status(500).json({ error: "Error al obtener inmueble comercial"})
            return
        }
        res.json(result)
    })

}


const residenciaByMail = (req,res) => {

    const personMail = req.params.mail
    let query = 
    `
    SELECT residencial.ID_Inmobiliaria, ID_Residencial, Nombre_Inmobiliaria,Correo_Inmobiliaria,Telefono_Inmobiliaria,TipoR,
    NombreR,HabitacionR,BanosR,ParqueaderosR,CiudadR,BarrioR,Unidad_CerradaR,Area_ConstruidaR,PrecioR,
    Ano_ConstruccionR,Tipo_ServicioR,Area_Lote,ImagenR,EnlaceR,EstadoR 
    FROM inmobiliaria
    INNER JOIN residencial ON residencial.ID_Inmobiliaria = inmobiliaria.ID_Inmobiliaria WHERE Correo_Inmobiliaria = ?;
    `

    db.query(query, [personMail], (err,result) => {
        if(err){
            console.log(`No se ha podido obtener inmuebles con el correo`, err);
            res.status(500).json({ error: "Error al obtener inmuebles"})
            return
        }
        res.json(result)
    })
}


const comercialByMail = (req, res) => {
    const personMail = req.params.mail

    let query = 
    `
    SELECT comercial.ID_Inmobiliaria,ID_Comercial,Nombre_Inmobiliaria,Correo_Inmobiliaria,Telefono_Inmobiliaria,TipoC,NombreC,CiudadC,BarrioC,AreaC,EstadoC,PrecioC,Ano_ConstruccionC,
    Tipo_ServicioC,Area_LoteC,ImagenC,EnlaceC
    FROM inmobiliaria
    INNER JOIN comercial ON comercial.ID_Inmobiliaria = inmobiliaria.ID_Inmobiliaria WHERE Correo_Inmobiliaria = ?;
    `

    db.query(query, [personMail], (err, result) => {
        if(err){
            console.log(`No se ha podido obtener inmuebles con el correo`, err);
            res.status(500).json({ error: "Error al obtener inmuebles"})
            return
        }
        res.json(result)
    })
}


const getResidenciaById = (req,res) => {
    const residenciaId = req.params.id

    let query = 
    `
    SELECT residencial.ID_Inmobiliaria, ID_Residencial, Nombre_Inmobiliaria,Correo_Inmobiliaria,Telefono_Inmobiliaria,TipoR,
    NombreR,HabitacionR,BanosR,ParqueaderosR,CiudadR,BarrioR,Unidad_CerradaR,Area_ConstruidaR,PrecioR,
    Ano_ConstruccionR,Tipo_ServicioR,Area_Lote,ImagenR,EnlaceR,EstadoR 
    FROM inmobiliaria
    INNER JOIN residencial ON residencial.ID_Inmobiliaria = inmobiliaria.ID_Inmobiliaria WHERE ID_Residencial = ?;
    `

    db.query(query, [residenciaId], (err,result) => {
        if(err){
            console.log(`No se ha podido obtener inmuebles con el correo`, err);
            res.status(500).json({ error: "Error al obtener inmuebles"})
            return
        }
        res.json(result)
    })


}

const getComercialById = (req,res) => {
    const comercialId = req.params.id

    let query = 
    `
    SELECT comercial.ID_Inmobiliaria,ID_Comercial,Nombre_Inmobiliaria,Correo_Inmobiliaria,Telefono_Inmobiliaria,TipoC,NombreC,CiudadC,BarrioC,AreaC,EstadoC,PrecioC,Ano_ConstruccionC,Tipo_ServicioC,
    Area_LoteC,ImagenC,EnlaceC
    FROM inmobiliaria
    INNER JOIN comercial ON comercial.ID_Inmobiliaria = inmobiliaria.ID_Inmobiliaria WHERE ID_Comercial = ?
    `

    db.query(query, [comercialId], (err,result) => {
        if(err){
            console.log(`No se ha podido obtener inmuebles con el correo`, err);
            res.status(500).json({ error: "Error al obtener inmuebles"})
            return
        }
        res.json(result)
    })
}

const leadResidencia = (req,res,next) => {
    let result;
    let id = req.body.idR
    

    try{
        const getDate = () => {
            let optionsDateHour = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true, // Usa el formato de 12 horas
                timeZone: 'America/Bogota'
            }

            const dateHour = new Date()
            const date = new Intl.DateTimeFormat('es-CO', optionsDateHour).format(dateHour)

            return date;    
        }

        result = 
        `
        SELECT ID_Residencial,Celular,Area_Lote,NombreR,HabitacionR,BanosR,ParqueaderosR,CiudadR,BarrioR,Tipo_ServicioR,Unidad_CerradaR,Area_ConstruidaR,
        Unidad_CerradaR,Ano_ConstruccionR,ImagenR,EnlaceR,PrecioR FROM inmobiliaria INNER JOIN residencial ON inmobiliaria.ID_Inmobiliaria = residencial.ID_Inmobiliaria
        WHERE ID_Residencial = ?;
        `
        
        db.query(result, [id],(err, response) => {
            if (err) {
                return res.status(500).json({ error: 'Error en la consulta a la base de datos' });
            }

            const { Celular, ImagenR,Area_Lote,NombreR,HabitacionR,BanosR,Ano_ConstruccionR,ParqueaderosR,CiudadR,BarrioR,Tipo_ServicioR,Unidad_CerradaR,TipoR,Area_ConstruidaR,
            EnlaceR,PrecioR, } = response[0]

            const infoJson = {
                Imagen: ImagenR,
                Asesor: Celular,
                Mensaje: `Alejo con número de teléfono: 5733293124 el ${getDate()} se encuentra interesado en el inmueble.\n
Nombre: ${NombreR} 🏡\n
Zona: ${BarrioR} 📌\n
Tipo: ${Tipo_ServicioR}🏡 \n
Ciudad: ${CiudadR} 🌇 \n
Area: ${Area_ConstruidaR} 🌇\n
Alcobas: ${HabitacionR} 🛌 \n
Baños: ${BanosR} 🚿\n
Garaje: ${ParqueaderosR} 🚗\n
Unidad Cerrada: ${Unidad_CerradaR} 🏘️\n
Año de construcción: ${Ano_ConstruccionR} 🏗️\n
Precio: ${PrecioR} 💰🪙\n
Más Información: ${EnlaceR} 🆙\n
                `
            }


            res.json(infoJson)
        });

    }catch(err){
        next(err)
    }

}

const leadComercial = (req, res, next) => {
    let result;
    let id = req.body.idC

    try{
        const getDate = () => {
            let optionsDateHour = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true, // Usa el formato de 12 horas
                timeZone: 'America/Bogota'
            }

            const dateHour = new Date()
            const date = new Intl.DateTimeFormat('es-CO', optionsDateHour).format(dateHour)

            return date;    
        }

        result = 
        `
        SELECT ID_Comercial,Celular,TipoC,Tipo_ServicioC,NombreC,CiudadC,BarrioC,AreaC,Area_LoteC,Ano_ConstruccionC, ImagenC,EnlaceC,PrecioC 
        FROM inmobiliaria INNER JOIN comercial ON inmobiliaria.ID_Inmobiliaria = comercial.ID_Inmobiliaria 
        WHERE ID_Comercial = ?;
        `
        
        db.query(result, [id], (err, response) => {
            if (err) {
                return res.status(500).json({ error: 'Error en la consulta a la base de datos' });
            }

            const { Celular, TipoC, Tipo_ServicioC, NombreC, CiudadC, BarrioC, AreaC, Area_LoteC, Ano_ConstruccionC, ImagenC, EnlaceC, PrecioC } = response[0]

            const infoJson = {
                Imagen: ImagenC,
                Asesor: Celular,
                Mensaje: `Alejo con número de teléfono: 5733293124 el ${getDate()} se encuentra interesado en el inmueble.\n
Nombre: ${NombreC} 🏡\n
Zona: ${BarrioC} 📌\n
Tipo: ${TipoC}🏡 \n
Tipo de Servicio: ${Tipo_ServicioC}
Ciudad: ${CiudadC} 🌇 \n
Area: ${AreaC} 🌇\n
Año de construcción: ${Ano_ConstruccionC} 🏗️\n
Precio: ${PrecioC} 💰🪙\n
Más Información: ${EnlaceC} 🆙\n 
                `
            }

            res.json(infoJson)
        })

    }catch(err){
        next(err)
    }
}

module.exports = { residencialFilter, comercialFilter, residenciaByMail, comercialByMail, getResidenciaById,getComercialById, leadResidencia,leadComercial }