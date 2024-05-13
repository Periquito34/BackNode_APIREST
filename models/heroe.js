const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MySqlConnection');

const Heroes = bdmysql.define('heroes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    aparicion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    casa: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    img: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});

module.exports = Heroes;
