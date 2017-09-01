const db = require('../connection');
const Sequelize = require('sequelize');

const ContributorModel = db.define('contributors', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
});

let Contributor = {model: ContributorModel};

Contributor.addContributor = (ownerId, contributorId, projectId) => {};
Contributor.removeContributor = (ownerId, contributorId, projectId) => {};
Contributor.getContributors = (projectId) => {};

module.exports = Contributor;