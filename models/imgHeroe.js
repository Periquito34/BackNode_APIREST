const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MySqlConnection');

const ImgHeroe = bdmysql.define('img_heroes',
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

module.exports = ImgHeroe;