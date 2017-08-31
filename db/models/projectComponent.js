const db = require('../connection');
const Sequelize = require('sequelize');

const ProjectComponentModel = db.define('components', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  type: {
    type: Sequelize.STRING(32),
    notEmpty: true,
    allowNull: false
  },
  likedId: {
    type: Sequelize.INTEGER,
    notEmpty: true,
    allowNull: false
  }
});

let ProjectComponent = {model: ProjectComponentModel};

create(userId, projectId, type, resourceLocation, name, description); // TODO - add component description and name to schema
update(userId, componentId, options);
delete(userId, componentId);
getByProject(projectId);
getByUser(userId);

module.exports = ProjectComponent;