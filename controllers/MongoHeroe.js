const { response } = require("express");
const { Heroe} = require("../models");
const { isValidObjectId } = require("../helpers/mongo-verify");
const { now } = require("mongoose");

const obtenerHeroes = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  //const query = { estado: true };

  try {
    const [total, heroes] = await Promise.all([
      Heroe.countDocuments(),
      Heroe.find()
        .skip(Number(desde))
        //.limit(Number(limite)),
    ]);

    res.json({ Ok: true, total: total, resp: heroes });
  } catch (error) {
    res.json({ Ok: false, resp: error });
  }
};

const obtenerHeroe = async (req, res = response) => {
  const { id } = req.params;
  try {
    const heroe = await Heroe.findById(id);
      
    res.json({ Ok: true, resp: heroe });
  } catch (error) {
    res.json({ Ok: false, resp: error });
  }
};

const crearHeroe = async (req, res = response) => {
  //const { body } = req.body;

  const body = req.body;

  //console.log("BODY INICIO",body);
  
  try {

    const heroeDB = await Heroe.findOne({ nombre: body.nombre });

    if (heroeDB) {
      return res.status(400).json({
        msg: `El Heroe ${body.nombre}, ya existe`,
      });
    }


    //Pasa a mayuscula el dato de la categoria
    //const nombre = req.body.nombre.toUpperCase();

    // Generar la data a guardar
    /*
    const data = {
        nombre: body.nombre,
        bio: body.bio,
        img: body.img,
        aparicion: body.aparicion,
        casa: body.casa
     };
     */

    
    const heroe = new Heroe(body);

    //console.log(heroe);

    // Guardar DB
    await heroe.save();

    //console.log("CREADA",heroe);

    res.status(201).json({ Ok: true, resp: heroe});
  } catch (error) {
    console.log("ERROR:INSERTAR",error);

    res.json({ Ok: false, resp: error });
  }
};

const actualizarHeroe = async (req, res = response) => {
  const { id } = req.params;

  const data  = req.body;

  console.log(data)

  try {

    /*
    if (data.nombre) {
        const heroeDB = await Heroe.findOne({ nombre: data.nombre });

        if (heroeDB) {
          return res.status(400).json({
            msg: `El Heroe ${data.nombre}, ya existe`,
          });
        }
    }
    */
    
    const heroe = await Heroe.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.json({ Ok: true, resp: heroe });
  } catch (error) {
    console.log("ERROR_MODIFICAR",error);
    res.json({ Ok: false, resp: error });
  }
};

const borrarHeroe = async (req, res = response) => {
  const { id } = req.params;
  try {

    const heroeBorrado = await Heroe.findByIdAndDelete(id);

    /*
    const opcionBorrada = await Option.findByIdAndUpdate(
      id,
      { estado: false, fecha_actualizacion: now() },
      { new: true }
    );
    */

    res.json({ Ok: true, resp: heroeBorrado });
  } catch (error) {
    console.log("ERROR_BORRADO",error);
    res.json({ Ok: false, resp: error });
  }
};

module.exports = {
  crearHeroe,
  obtenerHeroes,
  obtenerHeroe,
  actualizarHeroe,
  borrarHeroe,
};
