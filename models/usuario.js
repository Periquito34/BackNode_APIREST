const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MySqlConnection');


const Usuario = bdmysql.define('usuarios',
    {
        // Model attributes are defined here
        'id': {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        'nombre': {
            type: DataTypes.STRING,
            allowNull: false
        },
        'correo': {
            type: DataTypes.STRING,
            allowNull: false
            // allowNull defaults to true
        },
        'password': {
            type: DataTypes.STRING,
            allowNull: false
            // allowNull defaults to true
        },
        'img': {
            type: DataTypes.STRING
            // allowNull defaults to true
        },
        'estado': {
            type: DataTypes.BOOLEAN
            // allowNull defaults to true
        },
    }, 
    {
        //Maintain table name don't plurilize
        freezeTableName: true,

        // I don't want createdAt
        createdAt: false,

        // I don't want updatedAt
        updatedAt: false
    }
);


module.exports = {
    Usuario
}
