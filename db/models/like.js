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
  likedId: {
    type: Sequelize.INTEGER,
    notEmpty: true,
    allowNull: false
  }
});

let Like = {model: LikeModel};

like(userId, modelType, modelId)
unlike(userId, modelType, modelId)
getLikesByModel(modelType, modelId)
getLikesByUser(userId)

module.exports = Like;