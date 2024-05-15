const { Router } = require('express');
const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosDelete, 
        usuariosPatch } = require('../controllers/MongoUser');

const router = Router();

router.get('/', usuariosGet


    /* Implementa en el controller la logica del Router
    (req, res) => {
        //res.send('Hello World')
        res.json({
            //ok:true,
            msg:'get API'
           })
    
    }
    */

    
);

router.post('/', usuariosPost);

router.put('/:id', usuariosPut);

router.delete('/:id', usuariosDelete);

router.patch('/', usuariosPatch);



module.exports = router;



