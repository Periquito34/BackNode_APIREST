const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MySqlConnection');

const Imagen = bdmysql.define('imagenes',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        url: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    }
);

module.exports = Imagen;
