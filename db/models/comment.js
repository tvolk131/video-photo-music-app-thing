const db = require('../connection');
const Sequelize = require('sequelize');
const User = require('./user');

const CommentModel = db.define('comments', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
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
Comment.edit = (userId, newText) => {};
Comment.getByUser = (userId) => {};
Comment.getByProject = (projectId) => {};
Comment.delete = (userId, commentId) => {};

module.exports = Comment;