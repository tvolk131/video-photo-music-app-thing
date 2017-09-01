const db = require('../connection');
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
    type: Sequelize.STRING(256),
    notEmpty: true,
    allowNull: false
  }
});

let Project = {model: ProjectModel};

ProjectModel.create = (userId, name, description) => {};
ProjectModel.update = (userId, projectId, options) => {};
ProjectModel.delete = (userId, projectId) => {};
ProjectModel.getByNames = ([names]) => {}; // TODO - Talk this over
ProjectModel.getByName = (name) => {};
// TODO - Add tags

module.exports = Project;