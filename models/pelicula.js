const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MySqlConnection');

const Peliculas = bdmysql.define('peliculas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fecha_lanzamiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    img: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    // Mantener el nombre de la tabla tal como está en singular
    freezeTableName: true,
    // No quiero que se generen los campos 'createdAt' y 'updatedAt'
    timestamps: false
});

module.exports = Peliculas;
