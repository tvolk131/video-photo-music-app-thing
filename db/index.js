const folder = process.env.USE_ELASTICSEARCH !== 'false' ? 'elasticSearchControllers' : 'models';
const Comment = require(`./elasticSearchControllers/comment`);
const Contributor = require(`./${folder}/contributor`);
const Like = require(`./${folder}/like`);
const Project = require(`./${folder}/project`);
const ProjectComponent = require(`./${folder}/projectComponent`);
const Tag = require(`./${folder}/tag`);
const User = require(`./${folder}/user`);

const connection = require('./connection');
connection.clear = () => {
  return connection.sync({force: true});
};

User.model.belongsToMany(Project.model, {through: Contributor.model, as: 'project', foreignKey: 'contributorId'});
Project.model.belongsToMany(User.model, {through: Contributor.model, as: 'contributor', foreignKey: 'projectId'});

User.model.belongsToMany(User.model, {through: 'followers', as: 'follower', foreignKey: 'followeeId'});
User.model.belongsToMany(User.model, {through: 'followers', as: 'followee', foreignKey: 'followerId'});

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