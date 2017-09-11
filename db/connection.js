const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
let config;
if (process.env.DB_USERNAME && process.env.DB_PASSWORD && process.env.DB_NAME && process.env.DB_HOST && process.env.DB_DIALECT) {
  config = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: process.env.DB_LOGGING === undefined ? false : process.env.DB_LOGGING
  };
} else {
  config = require('./config.json')[env];
}
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