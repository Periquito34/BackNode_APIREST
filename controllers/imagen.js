const { response } = require('express');

const Imagenes = require('../models/imagen');

const crearImagen = async (req, res = response) => {    
    try {
        const { descripcion, url } = req.body;
        const nuevaImagen = await Imagenes.create({
            descripcion,
            url
        });
        res.status(201).json({
            ok: true,
            imagen: nuevaImagen
        });
    } catch (error) {
        const { descripcion, url } = req.body;
        if (descripcion === null) {
            res.status(500).json({
                ok: false,
                msg: 'La descripción de la imagen es obligatoria'
            });
        }
        else if (url === null) {
            res.status(500).json({
                ok: false,
                msg: 'La url de la imagen es obligatoria'
            });
        }
        console.error('Error al crear la imagen:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear la imagen'
        });
    }
}

const obtenerImagen = async (req, res) => {
    try {
        const imagenes = await Imagenes.findAll();
        res.json({
            ok: true,
            imagenes
        });
    } catch (error) {
        console.error('Error al obtener las imagenes:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener las imagenes'
        });
    }
}

const eliminarImagen = async (req, res) => {
    const { id } = req.params;
    try {
        const imagen = await Imagenes.findByPk(id);
        if (!imagen) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró la imagen'
            });
        }
        await imagen.destroy();
        res.json({
            ok: true,
            imagen
        });
    } catch (error) {
        console.error('Error al eliminar la imagen:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar la imagen'
        });
    }
}

const actualizarImagen = async (req, res) => {
    const { id } = req.params;
    try {
        const imagen = await Imagenes.findByPk(id);
        if (!imagen) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró la imagen'
            });
        }
        const { descripcion, url } = req.body;
        await imagen.update({
            descripcion,
            url
        });
        res.json({
            ok: true,
            imagen
        });
    } catch (error) {
        const { descripcion, url } = req.body;
        if (descripcion === null) {
            res.status(500).json({
                ok: false,
                msg: 'La descripción de la imagen es obligatoria'
            });
        }
        else if (url === null) {
            res.status(500).json({
                ok: false,
                msg: 'La url de la imagen es obligatoria'
            });
        }
        console.error('Error al actualizar la imagen:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar la imagen'
        });
    }
}

module.exports = {
    crearImagen,
    obtenerImagen,
    eliminarImagen,
    actualizarImagen
}