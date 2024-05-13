const { Router } = require('express');
const { validarJWTMySQL } = require('../middlewares/authMiddleware');
const { existeTituloPelicula}= require('../helper/db-validators')
const { crearPelicula, obtenerPeliculas, actualizarPelicula, eliminarPelicula} = require('../controllers/pelicula');

const router = Router();

router.post('/', validarJWTMySQL, existeTituloPelicula, crearPelicula);
router.get('/', validarJWTMySQL, obtenerPeliculas);
router.put('/:id', validarJWTMySQL, existeTituloPelicula, actualizarPelicula);
router.delete('/:id', validarJWTMySQL, eliminarPelicula);


module.exports = router;