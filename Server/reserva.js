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