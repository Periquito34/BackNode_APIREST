const { Router } = require('express');
const { validarJWTMySQL } = require('../middlewares/authMiddleware');
const { existeHeroe}= require('../helper/db-validators')
const { crearHeroe, obtenerHeroes, actualizarHeroe, eliminarHeroe } = require('../controllers/heroe');

const router = Router();

router.post('/', validarJWTMySQL, existeHeroe, crearHeroe);
router.get('/', validarJWTMySQL,obtenerHeroes);
router.put('/:id', validarJWTMySQL, existeHeroe, actualizarHeroe);
router.delete('/:id', validarJWTMySQL,eliminarHeroe);

module.exports = router;

