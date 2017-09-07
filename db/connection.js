const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config.json')[env];
let connection = new Sequelize(config.database, config.username, config.password, config);
connection.reset = () => {
  return connection.sync({force: true});
};

connection.sync().then(() => {
  console.log('Nice! Database looks fine.');
}).catch((err) => {
  console.log('Uh oh. something went wrong when updating the database.');
  console.error(err);
});

module.exports = connection;