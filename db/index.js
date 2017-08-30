const Author = require('./models/author');
const Comment = require('./models/comment');
const Contributor = require('./models/contributor');
const Like = require('./models/like');
const Project = require('./models/project');
const ProjectComponent = require('./models/projectComponent');
const User = require('./models/user');

const connection = require('./connection');

User.model.belongsToMany(Project.model, {through: Contributor.model, as: 'project', foreignKey: 'contributorId'});
Project.model.belongsToMany(User.model, {through: Contributor.model, as: 'contributor', foreignKey: 'projectId'});

User.model.belongsToMany(ProjectComponent.model, {through: Author.model, as: 'component', foreignKey: 'authorId'});
ProjectComponent.model.belongsToMany(User.model, {through: Author.model, as: 'author', foreignKey: 'componentId'});

Like.model.belongsTo(User.model, {as: 'user'});

Project.model.belongsTo(user.model, {as: 'owner'});
Project.model.belongsTo(ProjectComponent.model, {as: 'featuredComponent'});

ProjectComponent.model.belongsTo(Project.model, {as: 'project'});

Comment.model.belongsTo(User.model, {as: 'user'});
Comment.model.belongsTo(Project.model, {as: 'project'});

module.exports = {
  Author,
  Comment,
  Contributor,
  Like,
  Project,
  ProjectComponent,
  User,
  connection
};