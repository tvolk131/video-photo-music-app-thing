const db = require('../connection');
const Sequelize = require('sequelize');

const UserModel = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  oAuthUserId: {
    type: Sequelize.INTEGER
  },
  oAuthProvider: {
    type: Sequelize.STRING(32)
  },
  email: {
    type: Sequelize.STRING(64)
  },
  username: {
    type: Sequelize.STRING(64)
  },
  password: {
    type: Sequelize.STRING(64)
  },
  theme: {
    type: Sequelize.INTEGER(4)
  },
  name: {
    type: Sequelize.STRING(64)
  },
  avatarUrl: {
    type: Sequelize.STRING(64)
  },
  description: {
    type: Sequelize.STRING(256)
  }
});

let User = {model: UserModel};

module.exports = User;