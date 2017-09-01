const db = require('../connection');
const Sequelize = require('sequelize');
const User = require('./user');

const CommentModel = db.define('comments', {
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
  },
  text: {
    type: Sequelize.STRING(255),
    notEmpty: true,
    allowNull: false
  }
});

let Comment = {model: CommentModel};

Comment.create = (userId, projectId, text) => {
  return Comment.model.create({userId, projectId, text});
};
Comment.edit = (userId, commentId, newText) => {};
Comment.delete = (userId, commentId) => {};
Comment.getByUser = (userId) => {};
Comment.getByProject = (projectId) => {};

module.exports = Comment;