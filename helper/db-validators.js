const castingPelicula = require('../models/castingPelicula');
const pelicula = require('../models/pelicula');
const imgPelicula = require('../models/imgPelicula');
const img = require('../models/imagen');
const heroes = require('../models/heroe');
const heroePelicula = require('../models/heroePelicula');
const imgHeroe = require('../models/imgHeroe');
const { Usuario } = require('../models/usuario');
const ImgPelicula = require('../models/imgPelicula');
/*
const existeEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({
        where: {
            correo
        }
    });

    if (existeEmail) {
        throw new Error(`El correo ${correo} ya está registrado`);
    }
}
*/
const existeEmail = async( correo = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
  }
  

const existeTituloPelicula = async (titulo = '') => {
    const existeTitulo = await pelicula.findOne({titulo});
    if (existeTitulo) {
        throw new Error(`El título ${titulo} ya está registrado`);
    }
}

const existeURL = async (url = '') => {
    const existeURL = await img.findOne({url});

    if (existeURL) {
        throw new Error(`La url ${url} ya está registrada`);
    }
}

const existeHeroePelicula = async (peliculas_id = '', heroes_id = '') => {
    const existeHeroePelicula = await heroePelicula.findOne({peliculas_id, heroes_id});

    if (existeHeroePelicula) {
        throw new Error(`El héroe ${heroes_id} ya está registrado en la película ${peliculas_id}`);
    }
}

const existeHeroe = async (nombre = '') => {
    const existeHeroe = await heroes.findOne({nombre});

    if (existeHeroe) {
        throw new Error(`El héroe ${nombre} ya está registrado`);
    }
}

const existeCastingPelicula = async (peliculas_id = '', heroes_id = '') => {
    const existeCastingPelicula = await castingPelicula.findOne({peliculas_id, heroes_id});

    if (existeCastingPelicula) {
        throw new Error(`El héroe ${heroes_id} ya está registrado en el casting ${peliculas_id}`);
    }
}

const existeImgHeroe = async ( heroes_id='', imagenes_id='')=>{
    const existeImgHeroe = await imgHeroe.findOne({heroes_id, imagenes_id})

    if ( existeImgHeroe){
        throw new Error('La imagen ya existe en el heroe')
    }
}

const existeImgPelicula = async (peliculas_id='', imagenes_id='')=>{
    const existeImgPelicula = await ImgPelicula.findOne({peliculas_id,imagenes_id})

    if(existeImgPelicula){
        throw new Error('La imagen ya existe en la pelicula')
    }
}

module.exports = {
    existeEmail,
    existeTituloPelicula,
    existeURL,
    existeHeroePelicula,
    existeHeroe,
    existeCastingPelicula,
    existeImgHeroe,
    existeImgPelicula
}