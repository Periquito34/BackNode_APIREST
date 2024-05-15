/*
const { Router} = require('express');

const router = Router();

router.get('/', (req, res) => {
    //res.send('Hello World')
    res.json({
        //ok:true,
        msg:'get API'
       })

});

router.post('/', (req, res) => {
    //res.send('Hello World')
    res.status(201).json({
        //ok:true,
        msg:'post API'
       })

});

router.put('/', (req, res) => {
    //res.send('Hello World')
    res.json({
        //ok:true,
        msg:'put API'
       })

});

router.delete('/', (req, res) => {
    //res.send('Hello World')
    res.json({
        //ok:true,
        msg:'delete API'
       })

});

router.patch('/', (req, res) => {
    //res.send('Hello World')
    res.json({
        //ok:true,
        msg:'patch API'
       })

});


module.exports = router;
*/


const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearHeroe,
        obtenerHeroes,
        obtenerHeroe,
        actualizarHeroe, 
        borrarHeroe } = require('../controllers/MongoHeroe');
const { existeHeroePorId } = require('../helpers/db-validators');

const router = Router();

//  Obtener todas las Opciones - publico
router.get('/', obtenerHeroes );


// Obtener una Opcion por id - publico
router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeHeroePorId ),
    validarCampos,
], obtenerHeroe );

// Crear Opcion - privado - cualquier persona con un token válido
router.post('/', [ 
    //validarJWT,
    check('nombre','El nombre del heroe es obligatorio').not().isEmpty(),
    validarCampos
], crearHeroe );

// Actualizar Role- privado - cualquiera con token válido
router.put('/:id',[
    //validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeHeroePorId ),
    validarCampos
],actualizarHeroe );

// Borrar un Role - Admin
router.delete('/:id',[
    //validarJWT,
    //esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeHeroePorId ),
    validarCampos,
],borrarHeroe);

module.exports = router;
