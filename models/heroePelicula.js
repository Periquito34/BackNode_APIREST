const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MySqlConnection');

const HeroesPeliculas = bdmysql.define('heroes_peliculas',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        heroes_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        peliculas_id: {
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

module.exports = HeroesPeliculas;
