const db = require('../connection');
const Sequelize = require('sequelize');

const AuthorModel = db.define('authors', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
});

let Author = {model: AuthorModel};

module.exports = Author;