const { Router } = require('express');
const { validarJWTMySQL } = require('../middlewares/authMiddleware');
const { existeURL}= require('../helper/db-validators')
const { crearImagen, obtenerImagen, eliminarImagen, actualizarImagen } = require('../controllers/imagen');

const router = Router();

router.post('/', validarJWTMySQL, existeURL, crearImagen);
router.get('/', validarJWTMySQL, obtenerImagen);
router.put('/:id', validarJWTMySQL, existeURL, actualizarImagen);
router.delete('/:id', validarJWTMySQL, eliminarImagen);

module.exports = router;