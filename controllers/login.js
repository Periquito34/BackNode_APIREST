
const { response } = require("express");
const { Usuario } = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helper/auth");

const login = async (req, res = response) => {
    const { correo, password } = req.body;

    try {
        // Buscar el usuario por correo
        const usuario = await Usuario.findOne({ where: { correo } });
        const contraseñaValida = await Usuario.findOne({ where: { password } });
        
        // Si el usuario no existe
        if (!usuario) {
            return res.status(400).json({ ok: false, msg: 'Usuario no encontrado' });
        }

        if (!contraseñaValida) {
            return res.status(400).json({ ok: false, msg: 'Credenciales inválidas' });
        }

        // Generar token JWT
        const token = await generarJWT(usuario.id);

        // Enviar respuesta exitosa con el token y otros datos necesarios
        res.json({ ok: true, msg: 'Inicio de sesión exitoso', uid: usuario.id, token });
    } catch (error) {
        if (correo === null) {
            res.status(500).json({ ok: false, msg: 'El correo es obligatorio' });
        }
        else if (password === null) {
            res.status(500).json({ ok: false, msg: 'La contraseña es obligatoria' });
        }
        
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ ok: false, msg: 'Error al iniciar sesión' });
    }
}

module.exports = { login };


/*

const { response } = require('express');
const { Usuario } = require('../models/usuario');
const { generarJWT } = require('../helper/auth');

const login = async (req, res = response) => {
    const { correo, password } = req.body;

    try {
        // Verificar si el usuario existe en la base de datos
        const usuario = await Usuario.findOne({ where: { correo } });

        if (!usuario) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        // Verificar si la contraseña es correcta
        const contraseñaValida = (password === usuario.password);

        if (!contraseñaValida) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        // Generar un token de acceso
        const token = generarJWT(usuario.id);

        res.json({
            ok: true,
            token
        });
        
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ msg: 'Error al iniciar sesión' });
    }
};

module.exports = { login };
*/