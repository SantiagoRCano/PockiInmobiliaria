// const leadResidenciaUrl = (req,res,next) => {
//     let result;
//     let id = req.params.idR
    

//     try{
//         const getDate = () => {
//             let optionsDateHour = {
//                 year: 'numeric',
//                 month: '2-digit',
//                 day: '2-digit',
//                 hour: '2-digit',
//                 minute: '2-digit',
//                 hour12: true, // Usa el formato de 12 horas
//                 timeZone: 'America/Bogota'
//             }

//             const dateHour = new Date()
//             const date = new Intl.DateTimeFormat('es-CO', optionsDateHour).format(dateHour)

//             return date;    
//         }

//         result = 
//         `
//         SELECT ID_Residencial,Celular,TipoR,Area_Lote,NombreR,HabitacionR,BanosR,ParqueaderosR,CiudadR,BarrioR,Tipo_ServicioR,Unidad_CerradaR,Area_ConstruidaR,
//         Unidad_CerradaR,Ano_ConstruccionR,ImagenR,EnlaceR,PrecioR FROM inmobiliaria INNER JOIN residencial ON inmobiliaria.ID_Inmobiliaria = residencial.ID_Inmobiliaria
//         WHERE ID_Residencial = ?;
//         `
        
//         db.query(result, [id],(err, response) => {
//             if (err) {
//                 return res.status(500).json({ error: 'Error en la consulta a la base de datos' });
//             }

//             if(response.length === 0){
//                 return res.status(400).json({ Error: 'No se ha encontrado ningún resultado para el ID_Residencial proporcionado'})
//             }

//             const { Celular, ImagenR,Area_Lote,NombreR,HabitacionR,BanosR,Ano_ConstruccionR,ParqueaderosR,CiudadR,BarrioR,Tipo_ServicioR,Unidad_CerradaR,TipoR,Area_ConstruidaR,
//             EnlaceR,PrecioR, } = response[0]

//             const infoJson = {
//                 Imagen: ImagenR,
//                 Asesor: Celular,
//                 Mensaje: `Alejo con número de teléfono: 5733293124 el ${getDate()} se encuentra interesado en el inmueble.\n
// Nombre: ${NombreR} 🏡\n
// Zona: ${BarrioR} 📌\n
// Tipo: ${TipoR}🏡 \n
// Tipo de servicio: ${Tipo_ServicioR}
// Ciudad: ${CiudadR} 🌇 \n
// Area: ${Area_ConstruidaR} 🌇\n
// Alcobas: ${HabitacionR} 🛌 \n
// Baños: ${BanosR} 🚿\n
// Garaje: ${ParqueaderosR} 🚗\n
// Unidad Cerrada: ${Unidad_CerradaR} 🏘️\n
// Año de construcción: ${Ano_ConstruccionR} 🏗️\n
// Precio: ${PrecioR} 💰🪙\n
// Más Información: ${EnlaceR} 🆙\n
//                 `
//             }

//             res.json(response)
//         });


//     }catch(err){
//         next(err)
//     }

// }






// const leadComercialUrl = (req, res, next) => {
//     let result;
//     let id = req.params.idC

//     try{
//         const getDate = () => {
//             let optionsDateHour = {
//                 year: 'numeric',
//                 month: '2-digit',
//                 day: '2-digit',
//                 hour: '2-digit',
//                 minute: '2-digit',
//                 hour12: true, // Usa el formato de 12 horas
//                 timeZone: 'America/Bogota'
//             }

//             const dateHour = new Date()
//             const date = new Intl.DateTimeFormat('es-CO', optionsDateHour).format(dateHour)

//             return date;    
//         }

//         result = 
//         `
//         SELECT ID_Comercial,Celular,TipoC,Tipo_ServicioC,NombreC,CiudadC,BarrioC,AreaC,Area_LoteC,Ano_ConstruccionC, ImagenC,EnlaceC,PrecioC 
//         FROM inmobiliaria INNER JOIN comercial ON inmobiliaria.ID_Inmobiliaria = comercial.ID_Inmobiliaria 
//         WHERE ID_Comercial = ?;
//         `
        
//         db.query(result, [id], (err, response) => {
//             if (err) {
//                 return res.status(500).json({ error: 'Error en la consulta a la base de datos' });
//             }

//             if(response.length === 0){
//                 return res.status(400).json({Error: "No se ha encontrado ningún resultado para el ID_Comercial proporcionado"})
//             }

//             const { Celular, TipoC, Tipo_ServicioC, NombreC, CiudadC, BarrioC, AreaC, Area_LoteC, Ano_ConstruccionC, ImagenC, EnlaceC, PrecioC } = response[0]

//             const infoJson = {
//                 Imagen: ImagenC,
//                 Asesor: Celular,
//                 Mensaje: `Alejo con número de teléfono: 5733293124 el ${getDate()} se encuentra interesado en el inmueble.\n
// Nombre: ${NombreC} 🏡\n
// Zona: ${BarrioC} 📌\n
// Tipo: ${TipoC}🏡 \n
// Tipo de Servicio: ${Tipo_ServicioC}
// Ciudad: ${CiudadC} 🌇 \n
// Area: ${AreaC} 🌇\n
// Año de construcción: ${Ano_ConstruccionC} 🏗️\n
// Precio: ${PrecioC} 💰🪙\n
// Más Información: ${EnlaceC} 🆙\n `
//             }

//             res.json(infoJson)
//         })

//     }catch(err){
//         next(err)
//     }
// }



//Generar lead de residencia

// const leadResidencia = (req,res,next) => {
//     let result;
//     let id = req.body.idR
    

//     try{
//         const getDate = () => {
//             let optionsDateHour = {
//                 year: 'numeric',
//                 month: '2-digit',
//                 day: '2-digit',
//                 hour: '2-digit',
//                 minute: '2-digit',
//                 hour12: true, // Usa el formato de 12 horas
//                 timeZone: 'America/Bogota'
//             }

//             const dateHour = new Date()
//             const date = new Intl.DateTimeFormat('es-CO', optionsDateHour).format(dateHour)

//             return date;    
//         }

//         result = 
//         `
//         SELECT ID_Residencial,Celular,TipoR,Area_Lote,NombreR,HabitacionR,BanosR,ParqueaderosR,CiudadR,BarrioR,Tipo_ServicioR,Unidad_CerradaR,Area_ConstruidaR,
//         Unidad_CerradaR,Ano_ConstruccionR,ImagenR,EnlaceR,PrecioR FROM inmobiliaria INNER JOIN residencial ON inmobiliaria.ID_Inmobiliaria = residencial.ID_Inmobiliaria
//         WHERE ID_Residencial = ?;
//         `
        
//         db.query(result, [id],(err, response) => {
//             if (err) {
//                 return res.status(500).json({ error: 'Error en la consulta a la base de datos' });
//             }

//             if(response.length === 0){
//                 return res.status(400).json({ Error: 'No se ha encontrado ningún resultado para el ID_Residencial proporcionado'})
//             }

//             const { Celular, ImagenR,Area_Lote,NombreR,HabitacionR,BanosR,Ano_ConstruccionR,ParqueaderosR,CiudadR,BarrioR,Tipo_ServicioR,Unidad_CerradaR,TipoR,Area_ConstruidaR,
//             EnlaceR,PrecioR, } = response[0]

//             const infoJson = {
//                 Imagen: ImagenR,
//                 Asesor: Celular,
//                 Mensaje: `Alejo con número de teléfono: 5733293124 el ${getDate()} se encuentra interesado en el inmueble.\n
// Nombre: ${NombreR} 🏡\n
// Zona: ${BarrioR} 📌\n
// Tipo: ${TipoR}🏡 \n
// Tipo de servicio: ${Tipo_ServicioR}
// Ciudad: ${CiudadR} 🌇 \n
// Area: ${Area_ConstruidaR} 🌇\n
// Alcobas: ${HabitacionR} 🛌 \n
// Baños: ${BanosR} 🚿\n
// Garaje: ${ParqueaderosR} 🚗\n
// Unidad Cerrada: ${Unidad_CerradaR} 🏘️\n
// Año de construcción: ${Ano_ConstruccionR} 🏗️\n
// Precio: ${PrecioR} 💰🪙\n
// Más Información: ${EnlaceR} 🆙\n
//                 `
//             }

//             res.json(infoJson)
//         });


//     }catch(err){
//         next(err)
//     }

// }


//Generar lead de Comercial

// const leadComercial = (req, res, next) => {
//     let result;
//     let id = req.body.idC

//     try{
//         const getDate = () => {
//             let optionsDateHour = {
//                 year: 'numeric',
//                 month: '2-digit',
//                 day: '2-digit',
//                 hour: '2-digit',
//                 minute: '2-digit',
//                 hour12: true, // Usa el formato de 12 horas
//                 timeZone: 'America/Bogota'
//             }

//             const dateHour = new Date()
//             const date = new Intl.DateTimeFormat('es-CO', optionsDateHour).format(dateHour)

//             return date;    
//         }

//         result = 
//         `
//         SELECT ID_Comercial,Celular,TipoC,Tipo_ServicioC,NombreC,CiudadC,BarrioC,AreaC,Area_LoteC,Ano_ConstruccionC, ImagenC,EnlaceC,PrecioC 
//         FROM inmobiliaria INNER JOIN comercial ON inmobiliaria.ID_Inmobiliaria = comercial.ID_Inmobiliaria 
//         WHERE ID_Comercial = ?;
//         `
        
//         db.query(result, [id], (err, response) => {
//             if (err) {
//                 return res.status(500).json({ error: 'Error en la consulta a la base de datos' });
//             }

//             if(response.length === 0){
//                 return res.status(400).json({Error: "No se ha encontrado ningún resultado para el ID_Comercial proporcionado"})
//             }

//             const { Celular, TipoC, Tipo_ServicioC, NombreC, CiudadC, BarrioC, AreaC, Area_LoteC, Ano_ConstruccionC, ImagenC, EnlaceC, PrecioC } = response[0]

//             const infoJson = {
//                 Imagen: ImagenC,
//                 Asesor: Celular,
//                 Mensaje: `Alejo con número de teléfono: 5733293124 el ${getDate()} se encuentra interesado en el inmueble.\n
// Nombre: ${NombreC} 🏡\n
// Zona: ${BarrioC} 📌\n
// Tipo: ${TipoC}🏡 \n
// Tipo de Servicio: ${Tipo_ServicioC}
// Ciudad: ${CiudadC} 🌇 \n
// Area: ${AreaC} 🌇\n
// Año de construcción: ${Ano_ConstruccionC} 🏗️\n
// Precio: ${PrecioC} 💰🪙\n
// Más Información: ${EnlaceC} 🆙\n 
//                 `
//             }

//             res.json(infoJson)
//         })

//     }catch(err){
//         next(err)
//     }
// }



//Código en botpocket

// server.get('/api/getAllMessages', asyncHandler(_logController.getAllAnswer.bind(_logController)));

// async getAllAnswer(req, res, next){
//     let result;
//     try{
//         result = await this.manager.get(
//             `SELECT phone,message,DATE_FORMAT(creationdate, '%Y-%m-%d') as creationdate FROM auditTrail;`
//         )
//     }catch(error){
//         next(error)
//     }

//     res.json(result)
// }




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



// const leadResidenciaByMail = (req, res) => {
//     const personMail = req.params.mail

//     let query =
//     `
//     SELECT Idlead,NombreR,Nombrecliente,Numerocliente,Fechalead FROM leadsresidencia
//     INNER JOIN residencial ON leadsresidencia.Idresidencia = residencial.ID_Residencial
//     INNER JOIN inmobiliaria ON leadsresidencia.Idinmobiliaria = inmobiliaria.ID_Inmobiliaria
//     WHERE Correo_Inmobiliaria = ?;
//     `

//     db.query(query, [personMail], (err,result) => {
//         if(err){
//             console.log(`No se ha podido obtener leads con el correo`, err);
//             res.status(500).json({ error: "Error al obtener leads"})
//             return
//         }
//         res.json(result)
//     })
// }


// const leadComercialByMail = (req, res) => {
//     const personMail = req.params.mail

//     let query =
//     `
//     SELECT Idlead,NombreC,Nombrecliente,Numerocliente,Fechalead FROM leadscomercial
//     INNER JOIN comercial ON leadscomercial.Idcomercial = comercial.ID_Comercial
//     INNER JOIN inmobiliaria ON leadscomercial.Idinmobiliaria = inmobiliaria.ID_Inmobiliaria
//     WHERE Correo_Inmobiliaria = '?'
//     `

//     db.query(query, [personMail], (err, result) => {
//         if(err){
//             console.log(`No se ha podido obtener leads con el correo`, err);
//             res.status(500).json({ error: "Error al obtener leads"})
//             return
//         }
//         res.json(result)
//     })
// }