const Comment = require('./models/comment');
const Contributor = require('./models/contributor');
const Like = require('./models/like');
const Project = require('./models/project');
const ProjectComponent = require('./models/projectComponent');
const Tag = require('./models/tag');
const User = require('./models/user');

const connection = require('./connection');

User.model.belongsToMany(Project.model, {through: Contributor.model, as: 'project', foreignKey: 'contributorId'});
Project.model.belongsToMany(User.model, {through: Contributor.model, as: 'contributor', foreignKey: 'projectId'});

Project.model.belongsToMany(Tag.model, {through: 'projectTags', as: 'tag', foreignKey: 'projectId'});
Tag.model.belongsToMany(Project.model, {through: 'projectTags', as: 'project', foreignKey: 'tagId'});

Like.model.belongsTo(User.model, {as: 'user'});

Project.model.belongsTo(User.model, {as: 'owner'});
Project.model.hasOne(ProjectComponent.model, {as: 'featuredComponent'});

ProjectComponent.model.belongsTo(Project.model, {as: 'project'});
ProjectComponent.model.belongsTo(User.model, {as: 'author'});

Comment.model.belongsTo(User.model, {as: 'user'});
Comment.model.belongsTo(Project.model, {as: 'project'});

module.exports = {
  Comment,
  Contributor,
  Like,
  Project,
  ProjectComponent,
  User,
  connection
};