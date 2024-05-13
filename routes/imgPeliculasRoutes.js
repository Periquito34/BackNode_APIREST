const { Router } = require('express');
const { validarJWTMySQL } = require('../middlewares/authMiddleware');
const {existeImgPelicula}= require('../helper/db-validators')
const { crearImgPelicula, obtenerImgPelicula, eliminarImgPelicula, actualizarImagenPelicula} = require('../controllers/imgPelicula');

const router = Router();

router.post('/', validarJWTMySQL, existeImgPelicula, crearImgPelicula);
router.get('/', validarJWTMySQL, obtenerImgPelicula);
router.delete('/:id', validarJWTMySQL, eliminarImgPelicula);
router.put('/:id', validarJWTMySQL, existeImgPelicula, actualizarImagenPelicula);


module.exports = router;