const db = require('../connection');
const Sequelize = require('sequelize');

const CommentModel = db.define('comments', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
});

let Comment = {model: CommentModel};

module.exports = Comment;