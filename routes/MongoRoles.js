const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearRole,
        obtenerRoles,
        obtenerRole,
        actualizarRole, 
        borrarRole } = require('../controllers/MongoRoles');
const { existeRolePorId } = require('../helpers/db-validators');

const router = Router();

//  Obtener todas las Roles - publico
router.get('/', obtenerRoles );


// Obtener una Role por id - publico
router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeRolePorId ),
    validarCampos,
], obtenerRole );

// Crear Role - privado - cualquier persona con un token válido
router.post('/', [ 
    validarJWT,
    check('rol','El rol es obligatorio').not().isEmpty(),
    validarCampos
], crearRole );

// Actualizar Role- privado - cualquiera con token válido
router.put('/:id',[
    validarJWT,
    //check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeRolePorId ),
    validarCampos
],actualizarRole );

// Borrar un Role - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeRolePorId ),
    validarCampos,
],borrarRole);


module.exports = router;