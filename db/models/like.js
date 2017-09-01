const db = require('../connection');
const Sequelize = require('sequelize');

const LikeModel = db.define('likes', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  type: {
    type: Sequelize.STRING(32),
    notEmpty: true,
    allowNull: false
  },
  parentId: {
    type: Sequelize.INTEGER,
    notEmpty: true,
    allowNull: false
  }
});

let Like = {model: LikeModel};

Like.create = (userId, modelType, modelId) => {};
Like.destroy = (userId, modelType, modelId) => {};
Like.getByModel = (modelType, modelId) => {};
Like.getByUser = (userId) => {};

module.exports = Like;