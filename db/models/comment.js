const db = require('../connection');
const Sequelize = require('sequelize');
const User = require('./user');
const Project = require('./project');
const commentTypes = {
  project: Project
};

const CommentModel = db.define('comments', {
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
    type: Sequelize.STRING(255),
    notEmpty: true,
    allowNull: false
  }
});

let Comment = {model: CommentModel};

Comment.create = (userId, parentType, parentId, text) => {
  if (!text) {
    return Promise.reject('Comment text cannot be empty');
  }
  return User.getById(userId)
    .then(() => {
      if (!commentTypes[parentType]) {
        return Promise.reject(`Comment parent model not defined - please specify '${parentType}' in database comment.js commentTypes constant`);
      }
      return commentTypes[parentType].getById(parentId);
    })
    .then(() => {
      return Comment.model.create({userId, parentType, parentId, text});
    });
};

Comment.edit = (userId, commentId, newText) => {
  if (!newText) {
    return Promise.reject('Comment text cannot be empty');
  }
  return User.getById(userId)
    .then((user) => {
      return Comment.getById(commentId)
        .then((comment) => {
          if (user.id !== comment.userId) {
            return Promise.reject('Cannot edit a comment you do not own');
          }
          return comment.update({text: newText});
        });
    });
};

Comment.delete = (userId, commentId) => {
  return User.getById(userId)
    .then(() => {
      return Comment.getById(commentId)
        .then((comment) => {
          if (userId !== comment.userId) {
            return Promise.reject('Cannot delete another user\'s comment');
          }
          return comment.destroy()
            .then(() => {
              return true;
            });
        });
    });
};

Comment.getByUser = (userId) => {
  return User.getById(userId)
    .then(() => {
      return Comment.model.findAll({
        where: userId
      });
    });
};

Comment.getByParent = (parentType, parentId) => {
  if (!commentTypes[parentType]) {
    return Promise.reject(`Comment parent model not defined - please specify '${parentType}' in database comment.js commentTypes constant`);
  }
  return commentTypes[parentType].getById(parentId)
    .then((parent) => {
      return Comment.model.findAll({
        where: {parentId: parent.id}
      });
    });
};

Comment.getById = (userId) => {
  return Comment.model.findById(userId)
    .then((comment) => {
      return comment ? comment : Promise.reject('Comment does not exist');
    });
};

module.exports = Comment;