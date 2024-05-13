const { response } = require('express');
const HeroePelicula = require('../models/heroePelicula');

const crearHeroePelicula = async (req, res = response) => {
    try {
        const { heroes_id, peliculas_id } = req.body;
        const nuevaRelacion = await HeroePelicula.create({
            heroes_id,
            peliculas_id
        });
        res.status(201).json({
            ok: true,
            relacion: nuevaRelacion
        });
    } catch (error) {
        const { heroes_id, peliculas_id } = req.body;
        if (heroes_id === null) {
            res.status(500).json({
                ok: false,
                msg: 'El id del héroe es obligatorio'
            });
        }
        else if (peliculas_id === null) {
            res.status(500).json({
                ok: false,
                msg: 'El id de la película es obligatorio'
            });
        }
        console.error('Error al crear la relación:', error);
        res.status(500).json({
            ok: false,  
            msg: 'Error al crear la relación'
        });
    }
}

const obtenerHeroePelicula = async (req, res) => {
    try {
        const relaciones = await HeroePelicula.findAll();
        res.json({
            ok: true,
            relaciones
        });
    } catch (error) {
        console.error('Error al obtener las relaciones:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener las relaciones'
        });
    }
}

const eliminarHeroePelicula = async (req, res) => {
    const { id } = req.params;
    try {
        const relacion = await HeroePelicula.findByPk(id);
        if (!relacion) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró la relación'
            });
        }
        await relacion.destroy();
        res.json({
            ok: true,
            relacion
        });
    } catch (error) {
        console.error('Error al eliminar la relación:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar la relación'
        });
    }
}

const actualizarHeroePelicula = async (req, res) => {
    const { id } = req.params;
    const { heroes_id, peliculas_id } = req.body;
    try {
        const relacion = await HeroePelicula.findByPk(id);
        if (!relacion) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró la relación'
            });
        }
        relacion.heroes_id = heroes_id;
        relacion.peliculas_id = peliculas_id;
        await relacion.save();
        res.json({
            ok: true,
            relacion
        });
    } catch (error) {
        if (heroes_id === null) {
            res.status(500).json({
                ok: false,
                msg: 'El id del héroe es obligatorio'
            });
        }
        else if (peliculas_id === null) {
            res.status(500).json({
                ok: false,
                msg: 'El id de la película es obligatorio'
            });
        }
        console.error('Error al actualizar la relación:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar la relación'
        });
    }
}

module.exports = {
    crearHeroePelicula,
    obtenerHeroePelicula,
    eliminarHeroePelicula,
    actualizarHeroePelicula
}
