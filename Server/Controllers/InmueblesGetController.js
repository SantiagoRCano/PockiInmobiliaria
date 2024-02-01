const { query } = require('express')
const db = require('../Database/database.js')
const { json } = require('body-parser')
// const botController = require('./botController.js')
const { default: axios } = require('axios')

let token = process.env.TOKEN
let urlWsp = process.env.URLWSMESSAGE


//Función para filtrar en residencias

const residencialFilter = (req,res) => {
    let mensajerespuesta;

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


    query += ` AND EstadoR LIKE 'Disponible'`

    db.query(query, (err,result) => {
        if(err){
            console.log(`No se ha podido obtener las residencias`, err);
            res.status(500).json({ error: "Error al obtener residencias"})
            return
        }
        
      

        if(result.length > 0){
            mensajerespuesta = result
        }else{
            mensajerespuesta = { Error: "Ups😞, estuvimos buscando en el banco de propiedades de nuestras inmobiliarias suscritas 🔍y no encontramos opciones que se ajusten a tus criterios seleccionados📋, prueba con otras características y buscaremos nuevamente para ti, escribele a 🤖Pocki SALIR e inicia de nuevo."}
        }


        if(result.length === 0){
            res.status(400).json(mensajerespuesta)
        }else{
            res.json(mensajerespuesta)
        }
        

        
    })

}



//Funcion para filtrar por comercial

const comercialFilter = (req, res) => {
    let mensajerespuesta;

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


    query += ` AND EstadoC LIKE 'Disponible'`

    db.query(query, (err,result) => {
        if(err){
            console.log(`No se ha podido obtener los inmuebles comerciales`, err);
            res.status(500).json({ error: "Error al obtener inmueble comercial"})
            return
        }


        if(result.length > 0){
            mensajerespuesta = result
        }else{
            mensajerespuesta = { Error: "Ups😞, estuvimos buscando en el banco de propiedades de nuestras inmobiliarias suscritas 🔍y no encontramos opciones que se ajusten a tus criterios seleccionados📋, prueba con otras características y buscaremos nuevamente para ti, escribele a 🤖Pocki SALIR e inicia de nuevo."}
        }


        if(result.length === 0){
            res.status(400).json(mensajerespuesta)
        }else{
            res.json(mensajerespuesta)
        }

        
    })

}



//Funcion para obtener las propiedades residenciales según el usuario que ingrese al portal

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



//Funcion para obtener las propiedades comerciales según el usuario que entre al portal

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

//Funcion para obtener los leads residenciales según el usuario que tenga el portal
const leadRMail = (req, res) => {
    const personMail = req.params.mail

    let query =
    `
    SELECT Idlead,NombreR,Nombrecliente,Numerocliente,Fechalead FROM leadsresidencia
    INNER JOIN residencial ON residencial.ID_Residencial = leadsresidencia.Idresidencia
    INNER JOIN inmobiliaria ON inmobiliaria.ID_Inmobiliaria = residencial.ID_Inmobiliaria
    WHERE Correo_Inmobiliaria = ?
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


const leadCMail = (req, res) => {
    const personMail = req.params.mail

    let query = 
    `
    SELECT Idlead,NombreC,Nombrecliente,Numerocliente,Fechalead FROM leadscomercial
    INNER JOIN comercial ON comercial.ID_Comercial = leadscomercial.Idcomercial
    INNER JOIN inmobiliaria ON inmobiliaria.ID_Inmobiliaria = comercial.ID_Inmobiliaria
    WHERE Correo_Inmobiliaria = ?
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



//Obtener residencia según el ID

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

//Obtener comercial según el id

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





    const dataTelevisores = (req,res,next) => {
        let datosQuemados = [
            {Id:1, Nombre: 'Televisor 43 pulgadas Smart Android Ref. 43LO69', Comercial: 'Falabella', Precio: '$979.900', Enlace: 'https://www.falabella.com.co/falabella-co/product/122250224/Televisor-43-pulgadas-Smart-Android-Ref.-43LO69/122250225',Imagen:'https://i.postimg.cc/q7jp5LD5/televisor1.jpg'},
            {Id:2, Nombre: 'Televisor 43 Pulgadas FHD HYLED4321AIM Negro', Comercial: 'Homecenter', Precio: '$1.379.900', Enlace: 'https://www.homecenter.com.co/homecenter-co/product/498957/televisor-43-pulgadas-fhd-hyled4321aim-negro/498957/', Imagen: 'https://i.postimg.cc/k5ftvWQn/televisor2.png'},
            {Id:3, Nombre: 'Televisor CAIXUN 50 Pulgadas LED Uhd4K Smart TV C50VAUG', Comercial: 'Exito', Precio: '$1.279.900', Enlace: 'https://www.exito.com/televisor-caixun-50-pulgadas-led-uhd-4k-smart-tv-led-2023-3131838/p', Imagen: 'https://i.postimg.cc/HkttFcwN/televisor3.png'}
        ]


        res.json(datosQuemados)
    }

const productos = (req, res, next) => {
    let datos = [
        {
            Image: "https://i.imgur.com/QGgM211.png",
            Nombre: "Coca Cola Normal x600 ml",
            PrecioExito: 4130,
            LinkExito: "https://www.exito.com/gaseosa-coca-cola-pet-600-ml-409900",
            PrecioCarulla: 4200,
            LinkCarulla: "https://www.carulla.com/gaseosa-coca-cola-pet-600-ml-409900/p?&tab=coca%20cola&multipleSearch=pdp",
            PrecioOlimpica: 3950,
            LinkOlimpica: "https://www.olimpica.com/gaseosa-coca-cola-botella-no-retornable-600-ml-7702535001752-567998",
            PrecioJumbo: 4190,
            LinkJumbo: "https://www.tiendasjumbo.co/gaseosa-coca-cola-x-600-ml",
            PrecioMakro: 4100,
            LinkMakro: "https://tienda.makro.com.co/p/gaseosa-coca-cola-sabor-original-x600ml-112952"
        }
    ]

    res.json(datos)
}



const getAmountLead = (req, res) => {
    let personEmail = req.params.mail

    let query = `SELECT cantidadLeads FROM inmobiliaria WHERE Correo_Inmobiliaria = ?`

    db.query(query, [personEmail], (err, result) => {
        if(err){
            console.log(`No se ha podido obtener la cantidad de leads`, err);
            res.status(500).json({ error: "Error al obtener cantidad de leads"})
            return
        }
        res.json(result[0])
    })
}

const getAllInmobi = (req, res) => {
    let query = `SELECT ID_Inmobiliaria,Nombre_Inmobiliaria,Correofacturacion,Celular,Personaencargada,cantidadLeads,rol FROM inmobiliaria`

    db.query(query, (err, result) => {
        if(err){
            console.log(`No se ha podido obtener las inmobiliarias`, err);
            res.status(500).json({ error: "Error al obtener inmobiliarias"})
            return
        }

        const promesas = result.map(async (inmobiliaria) => {
            const totalMes = await getAllLeadsById(inmobiliaria.ID_Inmobiliaria);
            inmobiliaria.totalMes = totalMes
        });

        Promise.all(promesas).then(() => {
            res.json(result)
        })
    })
}


const getAllresidencias = (req, res) => {
    let query = `SELECT ID_Inmobiliaria,ID_Residencial,TipoR, NombreR, HabitacionR,BanosR,
    ParqueaderosR,CiudadR,BarrioR,Unidad_CerradaR,Area_ConstruidaR,PrecioR,Ano_ConstruccionR,Tipo_ServicioR,
    Area_Lote,ImagenR,EnlaceR,EstadoR
    FROM residencial`

    db.query(query, (err, result) => {
        if(err){
            console.log(`No se ha podido obtener las residencias`, err);
            res.status(500).json({ error: "Error al obtener residencias"})
            return
        }

        res.json(result)
    })
}

const getAllComerciales = (req, res) => {
    let query = ` SELECT ID_Inmobiliaria,ID_Comercial,TipoC,NombreC,CiudadC,BarrioC
    ,AreaC,EstadoC,PrecioC,Ano_ConstruccionC,Tipo_ServicioC,Area_LoteC,ImagenC,EnlaceC
    FROM comercial`

    db.query(query, (err, result) => {
        if(err){
            console.log(`No se ha podido obtener los comerciales`, err);
            res.status(500).json({ error: "Error al obtener comerciales"})
            return
        }

        res.json(result)
    })
}

const getAllLeadsComercial = (req, res) => {
    let query = `SELECT Idlead,Idcomercial,NombreC,Nombrecliente,Numerocliente,Fechalead 
                FROM leadscomercial
                INNER JOIN comercial ON leadscomercial.Idcomercial = comercial.ID_Comercial
                INNER JOIN inmobiliaria ON inmobiliaria.ID_Inmobiliaria = comercial.ID_Inmobiliaria`

    db.query(query, (err, result) => {
        if(err){
            console.log(`No se ha podido obtener los comerciales`, err);
            res.status(500).json({ error: "Error al obtener comerciales"})
            return
        }

        res.json(result)
    })
}

const getAllLeadsResidencias = (req, res) => {
    let query = `SELECT Idlead,Idresidencia,NombreR,Nombrecliente,Numerocliente,Fechalead FROM leadsresidencia
                INNER JOIN residencial ON leadsresidencia.Idresidencia = residencial.ID_Residencial
                INNER JOIN inmobiliaria ON inmobiliaria.ID_Inmobiliaria = residencial.ID_Inmobiliaria`

    db.query(query, (err, result) => {
        if(err){
            console.log(`No se ha podido obtener los comerciales`, err);
            res.status(500).json({ error: "Error al obtener comerciales"})
            return
        }

        res.json(result)
    })
}


const getAllLeads = (req,res) => {
    let fechaActual = new Date()
    let mesActual = fechaActual.getMonth()
    let firstMes = mesActual + 1
    let finalMes = mesActual + 2

    if(mesActual == 11){
        finalMes = mesActual - 10
    }

    let query = 
    `
        SELECT COUNT(DISTINCT Numerocliente) AS Total
        FROM (
        SELECT Numerocliente FROM leadscomercial WHERE Fechalead BETWEEN '2024-${firstMes}-01' AND '2024-${finalMes}-01'
        UNION ALL
        SELECT Numerocliente FROM leadsresidencia WHERE Fechalead BETWEEN '2024-${firstMes}-01' AND '2024-${finalMes}-01'
        ) AS ClientesCombinados;
    `

    db.query(query, (err,result) => {
        if(err){
            console.log(`No se ha podido obtener la cantidad`, err);
            res.status(500).json({ error: "Error al obtener la cantidad"})
            return
        }

        res.json(result[0])
    })
}


const getAllLeadsById = async(id) => {
    let fechaActual = new Date()
    let mesActual = fechaActual.getMonth()
    let firstMes = mesActual + 1
    let finalMes = mesActual + 2

    if(mesActual == 11){
        finalMes = mesActual - 10
    }

    let query = 
    `
        SELECT COUNT(DISTINCT Numerocliente) AS Totalmes
        FROM (
            SELECT Numerocliente 
            FROM leadscomercial AS lc
            INNER JOIN comercial AS c ON lc.Idcomercial = c.ID_Comercial
            INNER JOIN inmobiliaria AS i ON c.ID_Inmobiliaria = i.ID_Inmobiliaria
            WHERE lc.Fechalead BETWEEN '2024-${firstMes}-01' AND '2024-${finalMes}-01'
            AND i.ID_Inmobiliaria = ?
            UNION ALL
            SELECT Numerocliente 
            FROM leadsresidencia AS lr
            INNER JOIN residencial AS r ON lr.Idresidencia = r.ID_Residencial
            INNER JOIN inmobiliaria AS i ON r.ID_Inmobiliaria = i.ID_Inmobiliaria
            WHERE lr.Fechalead BETWEEN '2024-${firstMes}-01' AND '2024-${finalMes}-01'
            AND i.ID_Inmobiliaria = ?
        ) AS ClientesCombinados;
    `;

    return new Promise((resolve, reject) => {
        db.query(query, [id,id], (err,result) => {
            if(err){
                console.log(`No se ha podido obtener la cantidad de leads con ese id`, err);
                reject(err);    
            }else{
                resolve(result[0].Totalmes)
            }
        });
    });

}


const facturaLeadId = (req, res) => {
    let id = req.params.id
    let fechaActual = new Date()
    let mesActual = fechaActual.getMonth()
    let firstMes = mesActual + 1
    let finalMes = mesActual + 2

    if(mesActual == 11){
        finalMes = mesActual - 10
    }

    let query =
    `
        SELECT Numerocliente,
        MAX(Nombrecliente) AS Nombrecliente,
        SUBSTRING_INDEX(GROUP_CONCAT(NombreC ORDER BY NombreC SEPARATOR ', '), ',', -1) AS NombresC,
        SUBSTRING_INDEX(GROUP_CONCAT(EnlaceC ORDER BY EnlaceC SEPARATOR ', '), ',', -1) AS EnlacesC
        FROM (
            SELECT lc.Numerocliente, lc.Nombrecliente, c.NombreC, c.EnlaceC
            FROM leadscomercial AS lc
            INNER JOIN comercial AS c ON lc.Idcomercial = c.ID_Comercial
            INNER JOIN inmobiliaria AS i ON c.ID_Inmobiliaria = i.ID_Inmobiliaria
            WHERE lc.Fechalead BETWEEN '2024-${firstMes}-01' AND '2024-${finalMes}-01'
            AND i.ID_Inmobiliaria = ?
            UNION
            SELECT lr.Numerocliente, lr.Nombrecliente, r.NombreR, r.EnlaceR
            FROM leadsresidencia AS lr
            INNER JOIN residencial AS r ON lr.Idresidencia = r.ID_Residencial
            INNER JOIN inmobiliaria AS i ON r.ID_Inmobiliaria = i.ID_Inmobiliaria
            WHERE lr.Fechalead BETWEEN '2024-${firstMes}-01' AND '2024-${finalMes}-01'
            AND i.ID_Inmobiliaria = ?
        ) AS NumerosClientesConPropiedades
        GROUP BY Numerocliente;
    `

    db.query(query, [id,id], (err, result) => {
        if(err){
            console.log(`No se ha podido obtener facturación`, err);
            res.status(500).json({ error: "Error al obtener factura"})
            return
        }

        res.json(result)
    })

}



module.exports = { 
    residencialFilter, comercialFilter,
    residenciaByMail, comercialByMail,
    getResidenciaById,getComercialById,
    dataTelevisores,productos,
    leadCMail, leadRMail, 
    getAmountLead, getAllInmobi, getAllresidencias, getAllComerciales, getAllLeadsResidencias, getAllLeadsComercial, getAllLeads,
    getAllLeadsById, facturaLeadId
}


