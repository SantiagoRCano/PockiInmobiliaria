const db = require('../Database/database.js')

const residencialFilter = (req,res) => {
    let query = 
    `
    SELECT residencial.ID_Inmobiliaria,ID_Residencial,Nombre_Inmobiliaria,Correo_Inmobiliaria,Telefono_Inmobiliaria,TipoR, NombreR, HabitacionR,BanosR,
    ParqueaderosR,CiudadR,BarrioR,Unidad_CerradaR,Area_ConstruidaR,PrecioR,Ano_ConstruccionR,Tipo_ServicioR,
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
    query += Anoconstruccion != null ? ` AND Ano_ConstruccionR = ${Anoconstruccion}` : ""
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
    SELECT comercial.ID_Inmobiliaria,ID_Comercial,Nombre_Inmobiliaria,Correo_Inmobiliaria,Telefono_Inmobiliaria,TipoC,NombreC,CiudadC,BarrioC,AreaC,EstadoC,PrecioC,Ano_ConstruccionC,Tipo_ServicioC,
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
    Tipo_ServicioC,Area_LoteC 
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
    Area_LoteC
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

module.exports = { residencialFilter, comercialFilter, residenciaByMail, comercialByMail, getResidenciaById,getComercialById }