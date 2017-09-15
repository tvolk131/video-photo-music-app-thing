const db = require('../connection');
const Sequelize = require('sequelize');

const ContributorModel = db.define('contributors', {
  role: {
    type: Sequelize.STRING(128),
    notEmpty: true,
    allowNull: false
  }
});

let Contributor = {model: ContributorModel};

module.exports = Contributor;