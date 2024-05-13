const { response } = require('express');
const Heroes = require('../models/heroe');

const crearHeroe = async (req, res = response) => {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const { nombre, bio, aparicion, casa, img } = req.body;

        // Crear el héroe en la base de datos
        const nuevoHeroe = await Heroes.create({
            nombre,
            bio,
            aparicion,
            casa,
            img
        });

        // Responder con el héroe creado
        res.status(201).json({
            ok: true,
            heroe: nuevoHeroe
        });
    } catch (error) {
        const { nombre, bio, aparicion, casa, img } = req.body;
        if (nombre === null) {
            res.status(500).json({
                ok: false,
                msg: 'El nombre del héroe es obligatorio'
            });
        }
        else if (bio === null) {
            res.status(500).json({
                ok: false,
                msg: 'La biografía del héroe es obligatoria'
            });
        }
        else if (aparicion === null) {
            res.status(500).json({
                ok: false,
                msg: 'La aparición del héroe es obligatoria'
            });
        }
        else if (casa === null) {
            res.status(500).json({
                ok: false,
                msg: 'La casa del héroe es obligatoria'
            });
        }
        else if (img === null) {
            res.status(500).json({
                ok: false,
                msg: 'La imagen del héroe es obligatoria'
            });
        }

        console.error('Error al crear el héroe:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear el héroe'
        });
    }
};

const obtenerHeroes = async (req, res) => {
    try {
        // Consulta todos los héroes en la base de datos
        const heroes = await Heroes.findAll();

        // Envía la respuesta con los héroes encontrados
        res.json({
            ok: true,
            heroes
        });
    } catch (error) {
        console.error('Error al obtener los héroes:', error);
        // En caso de error, enviar una respuesta de error al cliente
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los héroes'
        });
    }
};

const actualizarHeroe = async (req, res) => {
    const { id } = req.params; // Obtén el ID del héroe a actualizar desde los parámetros de la URL
    const { nombre, bio, aparicion, casa, img } = req.body; // Obtén los nuevos datos del héroe desde el cuerpo de la solicitud

    try {
        // Busca el héroe en la base de datos por su ID
        const heroe = await Heroes.findByPk(id);

        // Si el héroe no existe, devuelve un mensaje de error
        if (!heroe) {
            return res.status(404).json({
                ok: false,
                msg: 'Héroe no encontrado'
            });
        }

        // Actualiza los datos del héroe con los nuevos valores
        heroe.nombre = nombre;
        heroe.bio = bio;
        heroe.aparicion = aparicion;
        heroe.casa = casa;
        heroe.img = img;

        // Guarda los cambios en la base de datos
        await heroe.save();

        // Envía una respuesta con el héroe actualizado
        res.json({
            ok: true,
            heroe
        });
    } catch (error) {
        if (nombre === null) {
            res.status(500).json({
                ok: false,
                msg: 'El nombre del héroe es obligatorio'
            });
        }
        else if (bio === null) {
            res.status(500).json({
                ok: false,
                msg: 'La biografía del héroe es obligatoria'
            });
        }
        else if (aparicion === null) {
            res.status(500).json({
                ok: false,
                msg: 'La aparición del héroe es obligatoria'
            });
        }
        else if (casa === null) {
            res.status(500).json({
                ok: false,
                msg: 'La casa del héroe es obligatoria'
            });
        }
        else if (img === null) {
            res.status(500).json({
                ok: false,
                msg: 'La imagen del héroe es obligatoria'
            });
        }

        console.error('Error al actualizar el héroe:', error);
        // En caso de error, enviar una respuesta de error al cliente
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el héroe'
        });
    }
};

const eliminarHeroe = async (req, res) => {
    const { id } = req.params; // Obtén el ID del héroe a eliminar desde los parámetros de la URL

    try {
        // Busca el héroe en la base de datos por su ID
        const heroe = await Heroes.findByPk(id);

        // Si el héroe no existe, devuelve un mensaje de error
        if (!heroe) {
            return res.status(404).json({
                ok: false,
                msg: 'Héroe no encontrado'
            });
        }

        // Elimina el héroe de la base de datos
        await heroe.destroy();

        // Envía una respuesta con el mensaje de éxito
        res.json({
            ok: true,
            msg: 'Héroe eliminado correctamente'
        });
    } catch (error) {
        console.error('Error al eliminar el héroe:', error);
        // En caso de error, enviar una respuesta de error al cliente
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar el héroe'
        });
    }
};

module.exports = {
    crearHeroe,
    obtenerHeroes,
    actualizarHeroe,
    eliminarHeroe
};
