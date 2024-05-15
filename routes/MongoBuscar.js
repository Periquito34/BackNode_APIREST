const { Router } = require('express');
const { buscar } = require('../controllers/MongoBuscar');

const router = Router();


router.get('/:coleccion/:termino', buscar )

//router.get('/:coleccion/:termino/:categoria', buscar )


module.exports = router;