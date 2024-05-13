const { Router } = require('express');
const { pruebaGet, pruebaPost, pruebaPut, pruebaDelete} = require('../controllers/prueba');

const router = Router();

router.get('/', 
pruebaGet);

router.post('/', pruebaPost);

router.put('/:id', pruebaPut);

router.delete('/:id', pruebaDelete);

module.exports = router;

