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

module.exports = ProjectComponent;