const { Sequelize } = require('sequelize');


//'db2' . 'root' ,''

const bdmysql = new Sequelize('', '', '', {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql'
});

module.exports = { bdmysql };