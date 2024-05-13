const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MySqlConnection');

const CastingPelicula = bdmysql.define('casting_pelicula',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        personaje: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        peliculas_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        heroes_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        },
    {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    }
);

module.exports = CastingPelicula;
