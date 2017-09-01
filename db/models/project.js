const db = require('../connection');
const Contributor = require('./contributor');
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
  return Project.model.create({ownerId, name, description, tagline});
};
Project.update = ({userId, projectId, options}) => {
  return Project.getById(projectId)
    .then((project) => {
      if (options.ownerId && project.ownerId !== userId) {
        return Promise.reject('Only the project owner can set another user as the owner');
      }
      return Contributor.model.findAll({
        where: {projectId}
      });
    })
    .then((contributorModels) => {
      // TODO - Continue implementation
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
Project.getByNames = ([names]) => {};
Project.getByName = (name) => {};

Project.addContributor = ({ownerId, contributorId, projectId}) => {
  return Project.getById(projectId)
    .then((project) => {
      if (project.ownerId !== ownerId) {
        return Promise.reject('Cannot add contributors to a project you do not own');
      }
      return Contributor.model.findOne({
        where: {contributorId, projectId}
      })
    })
    .then((contributorModel) => {
      if (contributorModel) {
        return Promise.reject('User is already a contributor to this project');
      }
      return Contributor.model.create({contributorId, projectId});
    });
};
Project.removeContributor = ({ownerId, contributorId, projectId}) => {
  return Project.getById(projectId)
    .then((project) => {
      if (project.ownerId !== ownerId) {
        return Promise.reject('Cannot remove contributors from a project you do not own');
      }
      return Contributor.model.findOne({
        where: {contributorId, projectId}
      })
    })
    .then((contributorModel) => {
      if (!contributorModel) {
        return Promise.reject('User is not a contributor to this project');
      }
      return contributorModel.destroy();
    });
};
Project.getContributors = (projectId) => {
  return Project.getById(projectId)
    .then((project) => {
      return Contributor.model.findAll({
        where: {projectId},
        include: [{
          model: User.model,
          as: 'contributor'
        }],
        attributes: {
          exclude: ['contributorId']
        }
      });
    })
    .then((contributorList) => {
      let contributors = [];
      contributorList.forEach((contributorItem) => {
        contributors.push(contributorItem.contributor);
      });
      return contributors;
    });
};
Project.addTag = (userId, projectId, tagText) => {};
Project.removeTag = (userId, projectId, tagText) => {};
Project.getTags = (projectId) => {};

module.exports = Project;