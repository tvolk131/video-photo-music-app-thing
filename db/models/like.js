const db = require('../connection');
const Sequelize = require('sequelize');
const User = require('./user');
const Project = require('./project');
const likeTypes = {
  project: Project
};

const LikeModel = db.define('likes', {
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
  }
});

let Like = {model: LikeModel};

Like.create = (userId, parentType, parentId) => {
  return User.getById(userId)
    .then((user) => {
      if (!likeTypes[parentType]) {
        return Promise.reject(`Like parent model not defined - please specify '${parentType}' in database like.js likeTypes constant`);
      }
      return likeTypes[parentType].getById(parentId);
    })
    .then(() => {
      return Like.model.findOne({
        where: {userId, parentType, parentId}
      });
    })
    .then((like) => {
      if (like) {
        return Promise.reject('You have already liked this item');
      }
      return Like.model.create({userId, parentType, parentId});
    })
    .then(() => {
      return true;
    });
};

Like.delete = (userId, parentType, parentId) => {
  return User.getById(userId)
    .then(() => {
      return Like.getOne(userId, parentType, parentId);
    })
    .then((like) => {
      return like.destroy();
    })
    .then(() => {
      return true;
    });
};

Like.getByParent = (parentType, parentId) => {
  if (!likeTypes[parentType]) {
    return Promise.reject(`Like parent model not defined - please specify '${parentType}' in database like.js likeTypes constant`);
  }
  return likeTypes[parentType].getById(parentId)
    .then((parent) => {
      return Like.model.findAll({
        where: {parentId: parent.id}
      });
    });
};

Like.getOne = (userId, parentType, parentId) => {
  if (!likeTypes[parentType]) {
    return Promise.reject(`Like parent model not defined - please specify '${parentType}' in database like.js likeTypes constant`);
  }
  return likeTypes[parentType].getById(parentId)
    .then((parent) => {
      return Like.model.findOne({
        where: {userId, parentType, parentId}
      });
    })
    .then((like) => {
      if (!like) {
        return Promise.reject('Like does not exist');
      }
      return like;
    });
};

Like.getByUser = (userId) => {
  return User.getById(userId)
    .then(() => {
      return Like.model.findAll({
        where: {userId}
      });
    });
};

module.exports = Like;