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

create(userId, text)
edit(userId, newText)
getByUser(userId)
getByProject(projectId)
delete(userId, commentId)

module.exports = Comment;