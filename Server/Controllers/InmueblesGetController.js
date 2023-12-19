const db = require('../Database/database.js')


const residencialFilter = (req,res) => {
    let query = 
    `
    SELECT Nombre_Inmobiliaria,Correo_Inmobiliaria,Telefono_Inmobiliaria,
    Nombre_Asesor,Telefono_Asesor,TipoR, NombreR, HabitacionR,BanosR,
    ParqueaderosR,CiudadR,BarrioR,Unidad_CerradaR,Area_ConstruidaR,PrecioR,Ano_ConstruccionR,Tipo_ServicioR,
    Area_Lote,ImagenR,EnlaceR,EstadoR
    FROM inmobiliaria INNER JOIN asesor ON asesor.ID_Inmobiliaria = inmobiliaria.ID_Inmobiliaria
    INNER JOIN residencial ON residencial.ID_Inmobiliaria = inmobiliaria.ID_Inmobiliaria 
    AND asesor.ID_Asesor = residencial.ID_Asesor WHERE 1 = 1
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
    query += Anoconstruccion != null ? ` AND Ano_ConstruccionR = ${Anoconstruccion}` : ""
    query += Presupuesto != null ? ` AND PrecioR <= ${Presupuesto}` : ""

    query += ` AND EstadoR = 1`

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
    SELECT Nombre_Inmobiliaria,Correo_Inmobiliaria,Telefono_Inmobiliaria,
    Nombre_Asesor,Telefono_Asesor,TipoC,NombreC,CiudadC,BarrioC,AreaC,PrecioC,Ano_ConstruccionC,Tipo_ServicioC,
    Area_LoteC
    FROM inmobiliaria INNER JOIN asesor ON asesor.ID_Inmobiliaria = inmobiliaria.ID_Inmobiliaria
    INNER JOIN comercial ON comercial.ID_Inmobiliaria = inmobiliaria.ID_Inmobiliaria 
    AND Asesor.ID_Asesor = comercial.ID_Asesor WHERE 1 = 1
    `

    const {Tipocomercial, Ciudad, Barrio,Tiposervicio,Areaconstruccion,Anoconstruccion,Presupuesto,Arealote} = req.body

    query += Tipocomercial != null && Tipocomercial.length > 0 ? ` AND TipoC LIKE '%${Tipocomercial}%'` : ""
    query += Ciudad != null && Ciudad.length > 0 ? ` AND CiudadC LIKE '%${Ciudad}%'` : ""
    query += Barrio != null && Barrio.length > 0 ? ` AND BarrioC LIKE '%${Barrio}%'` : ""
    query += Tiposervicio != null && Tiposervicio.length > 0 ? ` AND Tipo_ServicioC LIKE '%${Tiposervicio}%'`: ""
    query += Areaconstruccion != null ? ` AND AreaC >= ${Areaconstruccion}` : ""
    query += Anoconstruccion != null ? ` AND Ano_ConstruccionC = ${Anoconstruccion}` : ""
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




module.exports = { residencialFilter, comercialFilter }