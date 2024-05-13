const { Router } = require('express');
const { validarJWTMySQL } = require('../middlewares/authMiddleware');
const { existeImgHeroe}= require('../helper/db-validators')
const { crearImgHeroe, obtenerImgHeroe, actualizarImgHeroe, eliminarImgHeroe} = require('../controllers/imgHeroe');

const router = Router();

router.post('/', validarJWTMySQL, existeImgHeroe, crearImgHeroe);
router.get('/', validarJWTMySQL, obtenerImgHeroe);
router.put('/:id', validarJWTMySQL, existeImgHeroe, actualizarImgHeroe);
router.delete('/:id', validarJWTMySQL, eliminarImgHeroe);


module.exports = router;
