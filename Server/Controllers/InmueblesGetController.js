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
            Image: 'https://i.imgur.com/QGgM211.png',
            Text: `*Coca Cola Normal x 600 ml*
            *Éxito*: 4130
            https://www.exito.com/gaseosa-coca-cola-pet-600-ml-409900
            *Carulla*: 4200
            https://www.carulla.com/gaseosa-coca-cola-pet-600-ml-409900/p?&tab=coca%20cola&multipleSearch=pdp
            *Olimpica*: 3950
            https://www.olimpica.com/gaseosa-coca-cola-botella-no-retornable-600-ml-7702535001752-567998
            *Jumbo*: 4190
            https://www.tiendasjumbo.co/gaseosa-coca-cola-x-600-ml
            *Makro*: 4100
            https://tienda.makro.com.co/p/gaseosa-coca-cola-sabor-original-x600ml-112952
            *Lugar más barato*: Olimpica`
        }
    ]

    res.json(datos)
}



// const generateLeadResidencia = async(req, res, next) => {
//     let result;

//     const body = req.body;

//     try {
//         const getDate = () => {
//             const opcionesFechaHora = {
//                 year: 'numeric',
//                 month: '2-digit',
//                 day: '2-digit',
//                 hour: '2-digit',
//                 minute: '2-digit',
//                 hour12: true,
//                 timeZone: 'America/Bogota',
//             };

//             const fechaHora = new Date();
//             const formatoFechaHora = new Intl.DateTimeFormat('es-CO', opcionesFechaHora).format(fechaHora);

//             return formatoFechaHora;
//         };

//         result = 
//             `
//         SELECT ID_Residencial,Celular,TipoR,Area_Lote,NombreR,HabitacionR,BanosR,ParqueaderosR,CiudadR,BarrioR,Tipo_ServicioR,Unidad_CerradaR,Area_ConstruidaR,
//         Unidad_CerradaR,Ano_ConstruccionR,ImagenR,EnlaceR,PrecioR FROM inmobiliaria INNER JOIN residencial ON inmobiliaria.ID_Inmobiliaria = residencial.ID_Inmobiliaria
//         WHERE ID_Residencial = ?`;


//         db.query(result, [body.ID_Residencial], async(err,response) => {
//             if(response){
//                 const message = `${body.contactName} con número de teléfono: ${body.phone} el ${getDate()} se encuentra interesado en el inmueble.\n
// Nombre: ${response.NombreR} 🏡\n
// Zona: ${response.BarrioR} 📌\n
// Tipo: ${response.TipoR}🏡 \n
// Tipo de servicio: ${response.Tipo_ServicioR}
// Ciudad: ${response.CiudadR} 🌇 \n
// Area: ${response.Area_ConstruidaR} 🌇\n
// Alcobas: ${response.HabitacionR} 🛌 \n
// Baños: ${response.BanosR} 🚿\n
// Garaje: ${response.ParqueaderosR} 🚗\n
// Unidad Cerrada: ${response.Unidad_CerradaR} 🏘️\n
// Año de construcción: ${response.Ano_ConstruccionR} 🏗️\n
// Precio: ${response.PrecioR} 💰🪙\n
// Más Información: ${response.EnlaceR} 🆙\n`;
//             const _botController = new botController()
//             await _botController.sendMessageImage(response.Celular, {header: response.ImagenR, text: message})
//         }
//     })
//     } catch (error) {
//         next(error);
//     }
//     res.json(result);
// }


// const enviarWsp = async(req, res) => {
//     try{
//         const mensaje = {
//             to: req.body.phone,
//             type: 'image',
//             image: {
//                 link: req.body.imagen,
//                 caption: req.body.caption,
//             },
//             messaging_product: 'whatsapp',
//         };

//         const config = {
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`,
//             },
//         };


//         axios.post(urlWsp, mensaje, config)
//             .then(response => {
//                 console.log('Mensaje enviado con exito', response.data);
//                 res.status(200).json({ success: true, message: 'Mensaje enviado con éxito' });
//             })
//             .catch(err =>{
//                 console.error('Error al enviar el mensaje:', err.response.data);
//                 res.status(500).json({ success: false, message: 'Error al enviar el mensaje' });
//             })
//     }catch(error){
//         console.error('Error inesperado:', error);
//         res.status(500).json({ success: false, message: 'Error inesperado' });
//     }
// }





module.exports = { residencialFilter, comercialFilter,residenciaByMail, comercialByMail, getResidenciaById,getComercialById, dataTelevisores,productos }