const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config.json')[env];
let connection = new Sequelize(config.database, config.username, config.password, config);
connection.reset = () => {
  return connection.sync({force: true});
};

module.exports = connection;