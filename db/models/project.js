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

create(userId, name, description)
update(userId, projectId, options)
delete(userId, projectId)
getByNames([names]); // TODO - Talk this over
getByName(name);
// TODO - Add tags

module.exports = Project;