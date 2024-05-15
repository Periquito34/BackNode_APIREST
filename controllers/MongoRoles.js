const { response } = require("express");
const { Role } = require("../models");
const { now } = require("mongoose");

const obtenerRoles = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  try {
    const [total, roles] = await Promise.all([
      Role.countDocuments(query),
      Role.find(query)
        .populate("usuario", "nombre")
        .skip(Number(desde))
        .limit(Number(limite)),
    ]);

    res.json({ Ok: true, total: total, resp: roles });
  } catch (error) {
    res.json({ Ok: false, resp: error });
  }
};

const obtenerRole = async (req, res = response) => {
  const { id } = req.params;

  try {
    const role = await Role.findById(id).populate("usuario", "nombre");
    res.json({ Ok: true, resp: role });
  } catch (error) {
    res.json({ Ok: false, resp: error });
  }
};

const crearRole = async (req, res = response) => {
  const { estado, usuario, ...body } = req.body;

  //body.nombre = body.nombre.toUpperCase();

  try {
    //Verifica si el role existe
    const roleDB = await Role.findOne({ rol: body.rol });

    if (roleDB) {
      return res.status(400).json({
        msg: `El role ${body.rol}, ya existe`,
      });
    }

    //Pasa a mayuscula el dato de la categoria
    //const nombre = req.body.nombre.toUpperCase();

    // Generar la data a guardar
    const data = {
      rol: body.rol,
      imagen: body.imagen,
      usuario: req.usuario._id,
    };

    const role = new Role(data);

    // Guardar DB
    await role.save();

    res.status(201).json({ Ok: true, resp: role });
  } catch (error) {
    res.json({ Ok: false, resp: error });
  }
};

const actualizarRole = async (req, res = response) => {
  const { id } = req.params;
  const { usuario, ...data } = req.body;

  try {
    //Verifica el cambio de la Marca
    if (data.role) {
      //data.nombre = data.nombre.toUpperCase();

      //Verifica si la categoria existe
      const roleDB = await Marca.findOne({ rol: data.rol });

      if (roleDB) {
        return res.status(400).json({
          msg: `El role ${data.rol}, ya existe`,
        });
      }
    }

    data.usuario = req.usuario._id;
    data.fecha_actualizacion = now();

    const role = await Role.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.json({ Ok: true, resp: role });
  } catch (error) {
    res.json({ Ok: false, resp: error });
  }
};

const borrarRole = async (req, res = response) => {
  const { id } = req.params;
  try {
    const roleBorrada = await Role.findByIdAndUpdate(
      id,
      { estado: false, fecha_actualizacion: now() },
      { new: true }
    );

    res.json({ Ok: true, resp: roleBorrada });
  } catch (error) {
    res.json({ Ok: false, resp: error });
  }
};

module.exports = {
  crearRole,
  obtenerRoles,
  obtenerRole,
  actualizarRole,
  borrarRole,
};
