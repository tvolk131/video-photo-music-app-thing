const db = require('../connection');
const Sequelize = require('sequelize');
const User = require('./user');

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

Like.create = ({userId, parentClass, parentId}) => {
  if (!parentClass.getById) {
    return Promise.reject('Like parent model not defined');
  }
  return User.getById(userId)
    .then((user) => {
      return parentClass.getById(parentId);
    })
    .then(() => {
      return Like.model.findOne({
        where: {userId, parentType: parentClass.name, parentId}
      });
    })
    .then((like) => {
      if (like) {
        return Promise.reject('You have already liked this item');
      }
      return Like.model.create({userId, parentType: parentClass.name, parentId});
    })
    .then(() => {
      return true;
    });
};

Like.delete = ({userId, parentClass, parentId}) => {
  if (!parentClass.getById) {
    return Promise.reject('Like parent model not defined');
  }
  return User.getById(userId)
    .then(() => {
      return Like.getOne({userId, parentClass, parentId});
    })
    .then((like) => {
      return like.destroy();
    })
    .then(() => {
      return true;
    });
};

Like.getByParent = ({parentClass, parentId}) => {
  if (!parentClass.getById) {
    return Promise.reject('Like parent model not defined');
  }
  return parentClass.getById(parentId)
    .then((parent) => {
      return Like.model.findAll({
        where: {parentType: parentClass.name, parentId: parent.id}
      });
    });
};

Like.getOne = ({userId, parentClass, parentId}) => {
  if (!parentClass.getById) {
    return Promise.reject('Like parent model not defined');
  }
  return parentClass.getById(parentId)
    .then((parent) => {
      return Like.model.findOne({
        where: {userId, parentType: parentClass.name, parentId}
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