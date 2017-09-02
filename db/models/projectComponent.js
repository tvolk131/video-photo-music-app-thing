const db = require('../connection');
const Sequelize = require('sequelize');

const ProjectComponentModel = db.define('components', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  parentType: {
    type: Sequelize.STRING(32),
    notEmpty: true,
    allowNull: false
  },
  parentId: {
    type: Sequelize.INTEGER,
    notEmpty: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING(32),
    notEmpty: true,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING(256)
  },
  isDownloadable: {
    type: Sequelize.BOOLEAN,
    notEmpty: true,
    allowNull: false
  }
});

let ProjectComponent = {model: ProjectComponentModel};

ProjectComponentModel.create = (userId, projectId, type, resourceLocation, name, description) => {}; // TODO - add component description and name to schema
ProjectComponentModel.update = (userId, componentId, options) => {};
ProjectComponentModel.delete = (userId, componentId) => {};
ProjectComponentModel.getByProject = (projectId) => {};
ProjectComponentModel.getByUser = (userId) => {};

module.exports = ProjectComponent;