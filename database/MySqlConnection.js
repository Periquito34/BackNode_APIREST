const { Sequelize } = require('sequelize');

const bdmysql = new Sequelize('peliculas', 'root', '34152264', {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql'
});

module.exports = { bdmysql };