const {response, request} = require('express')


const usuariosGet = (req, res = response) => {

    const query = req.query;
 
    //Desestructuracion de argumentos
    const { q, nombre = 'No name', apikey, page=1, limit=10} = req.query;

    //res.send('Hello World')
    res.json({
        //ok:true,
        msg:'get API - Controller',
        query,
        q,
        nombre,
        apikey,
        page,
        limit
       })

}

const usuariosPost = (req = request, res = response) => {

    const body = req.body;
    const {nombre, edad} = req.body;

    //res.send('Hello World')
    res.json({
        //ok:true,
        msg:'post API - Controller',
        body,
        nombre,
        edad
       })

}



//Revisar los parametros de Segmento
const usuariosPut = (req, res = response) => {

    //const id = req.params.id;

    const {id} = req.params;

    //res.send('Hello World')
    res.json({
        //ok:true,
        msg:'put API - Controller',
        id
       })

}

const usuariosPatch = (req, res = response) => {
    //res.send('Hello World')
    res.json({
        //ok:true,
        msg:'patch API - Controller'
       })

}

const usuariosDelete = (req, res = response) => {
    //res.send('Hello World')
    res.json({
        //ok:true,
        msg:'delete API - Controller'
       })

}
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}