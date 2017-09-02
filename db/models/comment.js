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
Comment.edit = (userId, commentId, newText) => {};
Comment.delete = (userId, commentId) => {};
Comment.getByUser = (userId) => {};
Comment.getByParent = (parentType, parentId) => {};

module.exports = Comment;