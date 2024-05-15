const express = require('express');
const cors = require('cors');
const { bdmysql } = require('../database/MySqlConnection'); //importacion de coneccion a MySQL
import {connectToMongoDB } from '../database/MongoConnection';

//rutas mysql
const pruebaRoutes = require('../routes/routes'); // Importa tus rutas para las rutas /api/prueba
const heroesRoutes = require('../routes/heroeRoutes'); // Importa tus rutas para las rutas /api/heroes
const peliculaRoutes = require('..//routes/peliculaRoutes'); // Importa tus rutas para las rutas /api/peliculas
const HeroePelicula = require('../routes/heroesPeliculaRoutes'); // Importa tus rutas para las rutas /api/heroePelicula
const CastingPelicula = require('../routes/castingPeliculaRoutes'); // Importa tus rutas para las rutas /api/castingPelicula
const imagen = require('../routes/imagenesRoutes'); // Importa tus rutas para las rutas /api/imagenes
const ImgHeroe= require('../routes/imgHeroesRoutes'); // Importa tus rutas para las rutas /api/imgHeroe
const ImgPelicula = require('../routes/imgPeliculasRoutes'); // Importa tus rutas para las rutas /api/imgPelicula
const Usuario = require('../routes/usuariosRoutes'); // Importa tus rutas para las rutas /api/usuario

//rutas mongo
const mongoAuthRoutes = require('../routes/MongoAuth');
const mongoRolesRoutes = require('../routes/MongoRoles');
const mongoUsuariosRoutes = require('../routes/MongoUsuarios');
const mongoHeroesRoutes = require('../routes/MongoHeroe');
const mongoBuscarRoutes = require('../routes/MongoBuscar');
const mongoUserRoutes = require('../routes/MongoUser');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.pathsMySql = {
            auth: '/api/auth',
            prueba: '/api/prueba',
            heroes: '/api/heroe',
            peliculas: '/api/pelicula',
            heroePelicula: '/api/heroePelicula',
            castingPelicula: '/api/castingPelicula',
            imagen: '/api/imagen',
            imgHeroe: '/api/imgHeroe',
            imgPelicula: '/api/imgPelicula',
            Usuario: '/api/usuario'
        }

        this.pathsMongo = {
            auth: '/api/mongo/auth',
            roles: '/api/mongo/roles',
            usuarios: '/api/mongo/usuarios',
            heroes: '/api/mongo/heroes',
            buscar: '/api/mongo/buscar',
            user: '/api/mongo/user'
        };
      
        this.connectToMongoDB() //conexion mongo

        this.dbConnection(); //conexion mysql

        this.middlewares();
        this.routes(); 
    }
    
    
    
    async dbConnection() {
        try {
            await bdmysql.authenticate();
            console.log('Conexión exitosa a MySQL.');
        } catch (error) {
            console.error('No se pudo conectar a la base de datos MySQL:', error);
        }
    }

    async connectToMongoDB() {
        try {
            await connectToMongoDB();
        } catch (error) {
            console.error('No se pudo conectar a la base de datos MongoDB:', error);
        }
    }

    routes() {
        this.app.use(this.pathsMySql.prueba, pruebaRoutes); 
        this.app.use(this.pathsMySql.heroes, heroesRoutes);
        this.app.use(this.pathsMySql.peliculas, peliculaRoutes);
        this.app.use(this.pathsMySql.heroePelicula, HeroePelicula);
        this.app.use(this.pathsMySql.castingPelicula, CastingPelicula);
        this.app.use(this.pathsMySql.imagen, imagen);
        this.app.use(this.pathsMySql.imgHeroe, ImgHeroe);
        this.app.use(this.pathsMySql.imgPelicula, ImgPelicula);
        this.app.use(this.pathsMySql.Usuario, Usuario);
        //this.app.use(this.pathsMySql.post, postRoutes); 
        

        //MONGO
        //this.app.use(this.usuariosPath, require('../routes/MongoUser'));
        //this.app.use(this.heroesPath, require('../routes/MongoHeroe'));
        //this.app.use(this.usuariosPath, require('../routes/MongoUser'));
        //this.app.use(this.heroesPath, require('../routes/MongoHeroe'));

        this.app.use(this.pathsMongo.auth, require('../routes/MongoAuth'));
        this.app.use(this.pathsMongo.roles, require('../routes/MongoRoles'));
        this.app.use(this.pathsMongo.usuarios, require('../routes/MongoUsuarios'));
        this.app.use(this.pathsMongo.heroes, require('../routes/MongoHeroe'));
        this.app.use( this.pathsMongo.buscar, require('../routes/MongoBuscar'));

        this.app.use(this.pathsMongo.user, require('../routes/MongoUser'));
      
        



    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}

module.exports = Server;
