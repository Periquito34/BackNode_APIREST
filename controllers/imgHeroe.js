const { response } = require('express');
const ImgHeroe = require('../models/imgHeroe');

const crearImgHeroe = async (req, res = response) => {
    try {
        const { heroes_id, imagenes_id } = req.body;
        const nuevaImagen = await ImgHeroe.create({
            heroes_id,
            imagenes_id
        });
        res.status(201).json({
            ok: true,
            imagen: nuevaImagen
        });
    } catch (error) {
        const { heroes_id, imagenes_id } = req.body;
        if (heroes_id === null) {
            res.status(500).json({
                ok: false,
                msg: 'El id del héroe es obligatorio'
            });
        }
        else if (imagenes_id === null) {
            res.status(500).json({
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

const obtenerImgHeroe = async (req, res) => {
    try {
        const imagenes = await ImgHeroe.findAll();
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


const eliminarImgHeroe = async (req, res) => {
    const { id } = req.params;
    try {
        const imagen = await ImgHeroe.findByPk(id);
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


const actualizarImgHeroe = async (req, res) => {
    const { id } = req.params;
    try {
        const imagen = await ImgHeroe.findByPk(id);
        if (!imagen) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró la imagen'
            });
        }
        const { heroes_id, imagenes_id } = req.body;
        imagen.heroes_id = heroes_id;
        imagen.imagenes_id = imagenes_id;
        await imagen.save();
        res.json({
            ok: true,
            imagen
        });
    } catch (error) {
        const { heroes_id, imagenes_id } = req.body;
        if (heroes_id === null) {
            res.status(500).json({
                ok: false,
                msg: 'El id del héroe es obligatorio'
            });
        }
        else if (imagenes_id === null) {
            res.status(500).json({
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
    crearImgHeroe,
    obtenerImgHeroe,
    eliminarImgHeroe,
    actualizarImgHeroe
}
