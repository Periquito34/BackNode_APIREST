const { response } = require('express');
const CastingPelicula = require('../models/castingPelicula');

const crearCastingPelicula = async (req, res = response) => {
    try {
        const { personaje, peliculas_id, heroes_id } = req.body;
        const nuevoCasting = await CastingPelicula.create({
            personaje,
            peliculas_id,
            heroes_id
        });
        res.status(201).json({
            ok: true,
            casting: nuevoCasting
        });
    } catch (error) {
        
        const { personaje, peliculas_id, heroes_id } = req.body;
        
        if(personaje === null){
        res.status(500).json({
            ok: false,
            msg: 'El nombre del personaje es obligatorio'
        });
        }
        else if (peliculas_id === nulll){
            res.status(400).json({
                ok: false,
                msg: 'El id de la pelicula es obligatorio'
            });
        }
        else if (heroes_id === null){
            res.status(400).json({
                ok: false,
                msg: 'El id del heroe es obligatorio'
            });
        }

        console.error('Error al crear el casting:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear el casting'
        });
    }
}

const obtenerCastingPelicula = async (req, res) => {
    try {
        const casting = await CastingPelicula.findAll();
        res.json({
            ok: true,
            casting
        });
    } catch (error) {

        const casting = await CastingPelicula.findAll();

        if(casting === null){
        res.status(500).json({
            ok: false,
            msg: 'No se encontraron castings'
        });
        }

    }
}

const eliminarCastingPelicula = async (req, res) => {
    const { id } = req.params;
    try {
        const casting = await CastingPelicula.findByPk(id);
        if (!casting) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró el casting'
            });
        }
        await casting.destroy();
        res.json({
            ok: true,
            casting
        });
    } catch (error) {
        console.error('Error al eliminar el casting:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar el casting'
        });
    }
}

const actualizarCastingPelicula = async (req, res) => {
    const { id } = req.params;
    try {
        const casting = await CastingPelicula.findByPk(id);
        if (!casting) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró el casting'
            });
        }
        const { personaje, peliculas_id, heroes_id } = req.body;
        await casting.update({
            personaje,
            peliculas_id,
            heroes_id
        });
        res.json({
            ok: true,
            casting
        });
    } catch (error) {

        const { personaje, peliculas_id, heroes_id } = req.body;
        
        if(personaje === null){
        res.status(500).json({
            ok: false,
            msg: 'El nombre del personaje es obligatorio'
        });
        }
        else if (peliculas_id === null){
            res.status(400).json({
                ok: false,
                msg: 'El id de la pelicula es obligatorio'
            });
        }
        else if (heroes_id === null){
            res.status(400).json({
                ok: false,
                msg: 'El id del heroe es obligatorio'
            });
        }

        console.error('Error al actualizar el casting:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el casting'
        });
    }
}

module.exports = {
    crearCastingPelicula,
    obtenerCastingPelicula,
    eliminarCastingPelicula,
    actualizarCastingPelicula
}