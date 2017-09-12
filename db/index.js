const Chatroom = require('./models/chatroom');
const Comment = require('./models/comment');
const Like = require('./models/like');
const Message = require('./models/message');
const Project = require('./models/project');
const ProjectComponent = require('./models/projectComponent');
const Tag = require('./models/tag');
const User = require('./models/user');

const connection = require('./connection');
connection.clear = () => {
  return connection.sync({force: true});
};

User.model.belongsToMany(Project.model, {through: 'contributors', as: 'project', foreignKey: 'contributorId'});
Project.model.belongsToMany(User.model, {through: 'contributors', as: 'contributor', foreignKey: 'projectId'});

User.model.belongsToMany(User.model, {through: 'followers', as: 'follower', foreignKey: 'followeeId'});
User.model.belongsToMany(User.model, {through: 'followers', as: 'followee', foreignKey: 'followerId'});

Message.model.belongsTo(User.model, {as: 'user'});
Message.model.belongsTo(Chatroom.model, {as: 'chatroom'});

Chatroom.model.belongsToMany(User.model, {through: 'chatroomUsers', as: 'user', foreignKey: 'messageId'});
User.model.belongsToMany(Chatroom.model, {through: 'chatroomUsers', as: 'message', foreignKey: 'userId'});

Project.model.belongsToMany(Tag.model, {through: 'projectTags', as: 'tag', foreignKey: 'projectId'});
Tag.model.belongsToMany(Project.model, {through: 'projectTags', as: 'project', foreignKey: 'tagId'});

Like.model.belongsTo(User.model, {as: 'user'});

Project.model.belongsTo(User.model, {as: 'owner'});

ProjectComponent.model.belongsTo(Project.model, {as: 'project'});
ProjectComponent.model.belongsTo(User.model, {as: 'author'});

Comment.model.belongsTo(User.model, {as: 'user'});

module.exports = {
  Chatroom,
  Comment,
  Like,
  Message,
  Project,
  ProjectComponent,
  User,
  connection
};