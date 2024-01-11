const db = require('../Database/database.js')



//Eliminar un comercial

const deleteComercial = (req, res) => {
    let comercialId = req.params.id
    let query = `DELETE FROM comercial WHERE ID_Comercial = ?`


    db.query(query, [comercialId], (err, result) => {
        if(err){
            console.log(`No se ha podido eliminar el comercial`, err);
            res.status(500).json({ error: "Error al eliminar comercial"})
            return
        }
        
        res.status(200).send("Comercial eliminado exitosamente")
    })
}

//Eliminar una residencia

const deleteResidencia = (req, res) => {
    let residenciaId = req.params.id
    let query = `DELETE FROM residencial WHERE ID_Residencial = ?`

    db.query(query, [residenciaId], (err, result) => {
        if(err){
            console.log(`No se ha podido eliminar la residencia`, err);
            res.status(500).json({ error: "Error al eliminar residencia"})
            return
        }
        
        res.status(200).send("Residencia eliminada exitosamente")
    })
}



module.exports = { deleteComercial, deleteResidencia }