const { response } = require('express');
const ImgPelicula  = require('../models/imgPelicula');

const crearImgPelicula = async (req, res = response) => {
    try {
        const { peliculas_id, imagenes_id } = req.body;
        const nuevaImagen = await ImgPelicula.create({
            peliculas_id,
            imagenes_id
        });
        res.status(201).json({
            ok: true,
            imagen: nuevaImagen
        });
    } catch (error) {
        const { peliculas_id, imagenes_id } = req.body;
        if(peliculas_id === null){
            return res.status(400).json({
                ok: false,
                msg: 'El id de la pelicula es obligatorio'
            });
        }

        if(imagenes_id === null){
            return res.status(400).json({
                ok: false,
                msg: 'El id de la imagen es obligatorio'
            });
        }


        console.error('Error al crear la imagen:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear la imagen'
        });

        
    }
}

const obtenerImgPelicula = async (req, res) => {
    try {
        const imagenes = await ImgPelicula.findAll();
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

const eliminarImgPelicula = async (req, res) => {
    const { id } = req.params;
    try {
        const imagen = await ImgPelicula.findByPk(id);
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

const actualizarImagenPelicula = async (req, res) => {
    const { id } = req.params;
    try {
        const imagen = await ImgPelicula.findByPk(id);
        if (!imagen) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró la imagen'
            });
        }
        const { peliculas_id, imagenes_id } = req.body;
        await imagen.update({
            peliculas_id,
            imagenes_id
        });
        res.json({
            ok: true,
            imagen
        });
    } catch (error) {
        const { peliculas_id, imagenes_id } = req.body;
        if(peliculas_id === null){
            return res.status(400).json({
                ok: false,
                msg: 'El id de la pelicula es obligatorio'
            });
        }
        else if(imagenes_id === null){
            return res.status(400).json({
                ok: false,
                msg: 'El id de la imagen es obligatorio'
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
    crearImgPelicula,
    obtenerImgPelicula,
    eliminarImgPelicula,
    actualizarImagenPelicula
}

