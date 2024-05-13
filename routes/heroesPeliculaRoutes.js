const { Router } = require('express');
const { validarJWTMySQL } = require('../middlewares/authMiddleware');
const { existeHeroePelicula}= require('../helper/db-validators')
const { crearHeroePelicula, obtenerHeroePelicula, eliminarHeroePelicula, actualizarHeroePelicula } = require('../controllers/heroePelicula');

const router = Router();

router.post('/', validarJWTMySQL, existeHeroePelicula, crearHeroePelicula);
router.get('/', validarJWTMySQL, obtenerHeroePelicula);
router.delete('/:id', validarJWTMySQL, eliminarHeroePelicula);
router.put('/:id', validarJWTMySQL, existeHeroePelicula, actualizarHeroePelicula);

module.exports = router;

