const db = require('../Database/database.js')

const addResidencia = (req, res) => {
    const { Idinmobiliaria,Idasesor, Tiporesidencia,Nombre,Habitaciones,Baños,Parqueaderos,Ciudad,Barrio,Tiposervicio,
    Unidadcerrada, Areaconstruida,Anoconstruccion,Imagen,Enlace,Precio,Arealote, Estado} = req.body

    const query = `INSERT INTO residencial(ID_Inmobiliaria,ID_Asesor,TipoR,NombreR,HabitacionR,BanosR,ParqueaderosR,
    CiudadR,BarrioR,Tipo_ServicioR,Unidad_CerradaR,Area_ConstruidaR,Ano_ConstruccionR,ImagenR,EnlaceR,PrecioR,Area_Lote,EstadoR)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`


    const values = [Idinmobiliaria, Idasesor, Tiporesidencia, Nombre, Habitaciones, Baños, Parqueaderos,Ciudad,Barrio,
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
    const { Idinmobiliaria, Idasesor, Tipocomercial, Nombre, Ciudad, Barrio, Tiposervicio, 
    Areaconstruida, Anoconstruccion, Imagen,Enlace,Precio,Estado,Arealote } = req.body

    const query = `INSERT INTO comercial(ID_inmobiliaria,ID_Asesor,TipoC,NombreC,CiudadC,BarrioC,Tipo_ServicioC,
    AreaC,Ano_ConstruccionC,ImagenC,EnlaceC,PrecioC,EstadoC,Area_LoteC) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`


    const values = [Idinmobiliaria, Idasesor, Tipocomercial, Nombre, Ciudad, Barrio, Tiposervicio,
    Areaconstruida, Anoconstruccion, Imagen, Enlace, Precio, Estado, Arealote]

    db.query(query, values, (err, result) => {
        if(err){
            res.status(500).send("Error al crear comercial")
            console.log("No se ha podido crear comercial", err);
        }

        res.status(200).send("Comercial creado con exito")
    })
}


module.exports = { addResidencia, addComercial }