const db = require('../connection');
const User = require('./user');
const Sequelize = require('sequelize');

const ProjectModel = db.define('projects', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(64),
    notEmpty: true,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING(256)
  },
  tagline: {
    type: Sequelize.STRING(256)
  }
});

let Project = {model: ProjectModel};

Project.create = ({ownerId, name, description, tagline}) => {
  return User.getById(ownerId)
    .then(() => {
      return Project.model.create({ownerId, name, description, tagline});
    });
};
Project.update = ({userId, projectId, options}) => {
  return Project.getById(projectId)
    .then((project) => {
      if (options.ownerId && project.ownerId !== userId) {
        return Promise.reject('Only the project owner can set another user as the owner');
      }
      return Project.getContributors(project.id)
        .then((contributors) => {
          let contributorIds = [];
          contributors.forEach((contributor) => {contributorIds.push(contributor.id)});
          return contributorIds.includes(userId) || userId === project.ownerId ? project.update(options) : Promise.reject('Must be a contributor or owner to edit project');
        });
    });
};
Project.delete = (userId, projectId) => {};

// TODO - Test this
Project.getById = (projectId) => {
  return Project.model.findById(projectId)
    .then((project) => {
      return project ? project : Promise.reject('Project does not exist');
    });
};
Project.getByNames = (names) => {};

Project.getByName = (name) => {};

Project.addContributor = ({ownerId, contributorId, projectId}) => {
  return Project.getById(projectId)
    .then((project) => {
      if (project.ownerId !== ownerId) {
        return Promise.reject('Cannot add contributors to a project you do not own');
      }
      return User.getById(contributorId)
        .then((user) => {
          if (user.id === ownerId) {
            return Promise.reject('Owner cannot be added as a contributor');
          }
          return project.addContributor(user)
            .then((response) => {
              return response.length ? true : Promise.reject('User is already a contributor to this project');
            });
        });
    });
};

Project.removeContributor = ({ownerId, contributorId, projectId}) => {
  return Project.getById(projectId)
    .then((project) => {
      if (project.ownerId !== ownerId) {
        return Promise.reject('Cannot remove contributors from a project you do not own');
      }
      return User.getById(contributorId)
        .then((user) => {
          return project.removeContributor(user)
            .then((response) => {
              return response ? true : Promise.reject('User is not a contributor to this project');
            });
        });
    });
};

Project.getContributors = (projectId) => {
  return Project.model.findOne({
    where: {
      id: projectId,
    },
    include: [
      {
        model: User.model,
        as: 'contributor'
      }
    ]
  })
    .then((project) => {
      return project ? project.contributor : Promise.reject('Project does not exist');
    });
};

Project.addTag = (userId, projectId, tagText) => {};
Project.removeTag = (userId, projectId, tagText) => {};
Project.getTags = (projectId) => {};

module.exports = Project;