const { response } = require('express');
const Peliculas = require('../models/pelicula');

const crearPelicula = async (req, res = response) => {
    try {
        const { titulo, descripcion, fecha_lanzamiento, img } = req.body;
        const nuevaPelicula = await Peliculas.create({
            titulo,
            descripcion,
            fecha_lanzamiento,
            img
        });
        res.status(201).json({
            ok: true,
            pelicula: nuevaPelicula
        });
    } catch (error) {
        const { titulo, descripcion, fecha_lanzamiento, img } = req.body;
        if (titulo === null) {
            res.status(500).json({
                ok: false,
                msg: 'El título de la película es obligatorio'
            });
        }
        else if (descripcion === null) {
            res.status(500).json({
                ok: false,
                msg: 'La descripción de la película es obligatoria'
            });
        }
        else if (fecha_lanzamiento === null) {
            res.status(500).json({
                ok: false,
                msg: 'La fecha de lanzamiento de la película es obligatoria'
            });
        }
        else if (img === null) {
            res.status(500).json({
                ok: false,
                msg: 'La imagen de la película es obligatoria'
            });
        }

        console.error('Error al crear la película:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear la película'
        });
    }
}

const obtenerPeliculas = async (req, res) => {
    try {
        const peliculas = await Peliculas.findAll();
        res.json({
            ok: true,
            peliculas
        });
    } catch (error) {
        console.error('Error al obtener las películas:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener las películas'
        });
    }
};

const actualizarPelicula = async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, fecha_lanzamiento, img } = req.body;
    try {
        const pelicula = await Peliculas.findByPk(id);
        if (!pelicula) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró la película'
            });
        }
        pelicula.titulo = titulo;
        pelicula.descripcion = descripcion;
        pelicula.fecha_lanzamiento = fecha_lanzamiento;
        pelicula.img = img;
        await pelicula.save();
        res.json({
            ok: true,
            pelicula
        });
    } catch (error) {
        const { titulo, descripcion, fecha_lanzamiento, img } = req.body;
        if (titulo === null) {
            res.status(500).json({
                ok: false,
                msg: 'El título de la película es obligatorio'
            });
        }
        else if (descripcion === null) {
            res.status(500).json({
                ok: false,
                msg: 'La descripción de la película es obligatoria'
            });
        }
        else if (fecha_lanzamiento === null) {
            res.status(500).json({
                ok: false,
                msg: 'La fecha de lanzamiento de la película es obligatoria'
            });
        }
        else if (img === null) {
            res.status(500).json({
                ok: false,
                msg: 'La imagen de la película es obligatoria'
            });
        }
        console.error('Error al actualizar la película:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar la película'
        });
    }
}

const eliminarPelicula = async (req, res) => {
    const { id } = req.params;
    try {
        const pelicula = await Peliculas.findByPk(id);
        if (!pelicula) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró la película'
            });
        }
        await pelicula.destroy();
        res.json({
            ok: true,
            msg: 'Pelicula eliminada'
        });
    } catch (error) {
        console.error('Error al eliminar la película:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar la película'
        });
    }
}



module.exports = {
    crearPelicula,
    obtenerPeliculas,
    actualizarPelicula,
    eliminarPelicula
};