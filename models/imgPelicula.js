const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MySqlConnection');

const ImgPelicula = bdmysql.define('img_peliculas',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        peliculas_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        imagenes_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    }
);

module.exports = ImgPelicula;
