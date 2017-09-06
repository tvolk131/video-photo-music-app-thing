const db = require('../connection');
const Sequelize = require('sequelize');

const TagModel = db.define('tags', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  parentType: {
    type: Sequelize.STRING(32),
    notEmpty: true,
    allowNull: false
  },
  parentId: {
    type: Sequelize.INTEGER,
    notEmpty: true,
    allowNull: false
  },
  text: {
    type: Sequelize.STRING(32),
    notEmpty: true,
    allowNull: false
  }
});

let Tag = {model: TagModel};



module.exports = Tag;