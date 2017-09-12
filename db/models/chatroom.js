const db = require('../connection');
const Sequelize = require('sequelize');

const ChatroomModel = db.define('chatrooms', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(32)
  },
  isPM: {
    type: Sequelize.BOOLEAN,
    notEmpty: true,
    allowNull: false
  },
  selfManaged: {
    type: Sequelize.BOOLEAN,
    notEmpty: true,
    allowNull: false
  }
});

let Chatroom = {model: ChatroomModel};

Chatroom.managed = {};
Chatroom.unmanaged = {};

Chatroom.managed.create = () => {};
Chatroom.managed.update = () => {};

Chatroom.unmanaged.create = () => {};
Chatroom.unmanaged.update = () => {};

Chatroom.addUser = () => {};
Chatroom.removeUser = () => {};
Chatroom.create = () => {};
Chatroom.create = () => {};
Chatroom.create = () => {};

module.exports = Chatroom;