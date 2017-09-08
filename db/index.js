const Comment = require('./models/comment');
const Like = require('./models/like');
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

Project.model.belongsToMany(Tag.model, {through: 'projectTags', as: 'tag', foreignKey: 'projectId'});
Tag.model.belongsToMany(Project.model, {through: 'projectTags', as: 'project', foreignKey: 'tagId'});

Like.model.belongsTo(User.model, {as: 'user'});

Project.model.belongsTo(User.model, {as: 'owner'});

ProjectComponent.model.belongsTo(Project.model, {as: 'project'});
ProjectComponent.model.belongsTo(User.model, {as: 'author'});

Comment.model.belongsTo(User.model, {as: 'user'});

module.exports = {
  Comment,
  Like,
  Project,
  ProjectComponent,
  User,
  connection
};