const db = require('../connection');
const User = require('./user');
const Sequelize = require('sequelize');
const Like = require('./like');

const MessageModel = db.define('messages', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  text: {
    type: Sequelize.STRING(64),
    notEmpty: true,
    allowNull: false
  }
});

let Message = {model: MessageModel};

Message.name = 'message';
Like.addToClass(Message);

module.exports = Message;