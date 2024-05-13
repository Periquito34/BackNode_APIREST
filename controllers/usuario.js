const {response, request} = require('express')
const { Usuario } = require('../models/usuario');

const obtenerUsuarios = async (req = request, res = response) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json({
            ok: true,
            usuarios
        });
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los usuarios'
        });
    }
}


const crearUsuario = async (req, res = response) => {
    try {
        const { nombre, correo, password, img, estado } = req.body;
        const nuevoUsuario = await Usuario.create({
            nombre,
            correo,
            password,
            img,
            estado
        });
        res.status(201).json({
            ok: true,
            usuario: nuevoUsuario
        });
    } catch (error) {
        const { nombre, correo, password, img, estado } = req.body;
        if (nombre === null) {
            res.status(500).json({
                ok: false,
                msg: 'El nombre del usuario es obligatorio'
            });
        }
        else if (correo === null) {
            res.status(500).json({
                ok: false,
                msg: 'El correo del usuario es obligatorio'
            });
        }
        else if (password === null) {
            res.status(500).json({
                ok: false,
                msg: 'La contraseña del usuario es obligatoria'
            });
        }
        else if (img === null) {
            res.status(500).json({
                ok: false,
                msg: 'La imagen del usuario es obligatoria'
            });
        }
        else if (estado === null) {
            res.status(500).json({
                ok: false,
                msg: 'El estado del usuario es obligatorio'
            });
        }
        console.error('Error al crear el usuario:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear el usuario'
        });
    }
}

const actualizarUsuario = async (req, res = response) => {
    const { id } = req.params;
    const { nombre, correo, password, img, estado } = req.body;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró el usuario'
            });
        }
        await usuario.update({
            nombre,
            correo,
            password,
            img,
            estado
        });
        res.json({
            ok: true,
            usuario
        });
    } catch (error) {
        if (nombre === null) {
            res.status(500).json({
                ok: false,
                msg: 'El nombre del usuario es obligatorio'
            });
        }
        else if (correo === null) {
            res.status(500).json({
                ok: false,
                msg: 'El correo del usuario es obligatorio'
            });
        }
        else if (password === null) {
            res.status(500).json({
                ok: false,
                msg: 'La contraseña del usuario es obligatoria'
            });
        }
        else if (img === null) {
            res.status(500).json({
                ok: false,
                msg: 'La imagen del usuario es obligatoria'
            });
        }
        else if (estado === null) {
            res.status(500).json({
                ok: false,
                msg: 'El estado del usuario es obligatorio'
            });
        }
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el usuario'
        });
    }
}

const eliminarUsuario = async (req, res = response) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró el usuario'
            });
        }
        await usuario.destroy();
        res.json({
            ok: true,
            usuario
        });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar el usuario'
        });
    }
}

module.exports = {
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}