const { Router } = require('express');
const { validarJWTMySQL } = require('../middlewares/authMiddleware');
const { existeCastingPelicula}= require('../helper/db-validators')
const { crearCastingPelicula, obtenerCastingPelicula, eliminarCastingPelicula, actualizarCastingPelicula } = require('../controllers/castingPelicula');

const router = Router();

router.post('/', validarJWTMySQL,existeCastingPelicula, crearCastingPelicula);
router.get('/', validarJWTMySQL, obtenerCastingPelicula  );
router.put('/:id',validarJWTMySQL, existeCastingPelicula, actualizarCastingPelicula);
router.delete('/:id',validarJWTMySQL,  eliminarCastingPelicula);

module.exports = router;
