const { Router } = require('express');
const { obtenerUsuarios,crearUsuario, actualizarUsuario, eliminarUsuario} = require('../controllers/usuario');
const { validarJWTMySQL } = require('../middlewares/authMiddleware');
const { existeEmail} = require('../helper/db-validators');
const { login } = require('../controllers/login');

const router = Router();

router.post('/login', login);

router.get('/', 
validarJWTMySQL, 
obtenerUsuarios);


router.post('/', 
validarJWTMySQL, existeEmail,
crearUsuario);

router.put('/:id', 
validarJWTMySQL, existeEmail,
actualizarUsuario);

router.delete('/:id',
validarJWTMySQL, 
eliminarUsuario);


module.exports = router;






/*const { Router } = require('express');
const router = Router();
const { obtenerUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuario');
const { verificarToken } = require('../middlewares/authMiddleware');
const { login } = require('../controllers/login'); // Cambio de nombre a la función de inicio de sesión

// Rutas protegidas
router.get('/', verificarToken, obtenerUsuarios);
router.post('/', verificarToken, crearUsuario);
router.put('/:id', verificarToken, actualizarUsuario);
router.delete('/:id', verificarToken, eliminarUsuario);

// Ruta para iniciar sesión (login)
router.post('/login', login); // Cambio de nombre aquí también

module.exports = router;




const { Router } = require('express');

const { obtenerUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuario');

const router = Router();

router.get('/', obtenerUsuarios);
router.post('/', crearUsuario);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

module.exports = router;*/