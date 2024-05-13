const {response, request} = require('express')

const pruebaGet = (req, res = response) => {

    const query = req.query;
    const { q, nombre = 'No name', apikey, page=1, limit=10} = req.query;


    res.json({
        msg:'get API - Controller',
        query,
        q,
        nombre,
        apikey,
        page,
        limit
       })
}

const pruebaPost = (req, res = response) => {
    const { id, nombre, apellido, edad } = req.body;

    try {
        
        res.json({
            ok: true,
            msg: 'Datos recibidos correctamente',
            id,
            nombre,
            apellido,
            edad
        });
    } catch (error) {
        console.error('Error al procesar la solicitud POST:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al procesar la solicitud POST'
        });
    }
};

const pruebaPut = (req, res = response) => {
    const { id } = req.params; // Obtener el ID del parámetro de la URL
    const { nombre, apellido, edad } = req.body;

    try {
        // Aquí puedes agregar la lógica para actualizar los datos en tu base de datos
        // Por ahora, solo simularé la actualización con un mensaje de respuesta
        res.json({
            ok: true,
            msg: 'Datos actualizados correctamente',
            id,
            nombre,
            apellido,
            edad
        });
    } catch (error) {
        console.error('Error al procesar la solicitud PUT:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al procesar la solicitud PUT'
        });
    }
};
const pruebaDelete = (req, res = response) => {
    const { id } = req.params; // Obtener el ID del parámetro de la URL

    try {
        // Aquí puedes agregar la lógica para eliminar los datos en tu base de datos
        // Por ahora, simplemente simularemos la eliminación con un mensaje de respuesta
        res.json({
            ok: true,
            msg: 'Datos eliminados correctamente',
            id
        });
    } catch (error) {
        console.error('Error al procesar la solicitud DELETE:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al procesar la solicitud DELETE'
        });
    }
};

const pruebaPatch = (req, res = response) => {
    res.json({
        msg:'patch API - Controller'
    })
}


module.exports = {
    pruebaGet,
    pruebaPost,
    pruebaPut,
    pruebaDelete
}
