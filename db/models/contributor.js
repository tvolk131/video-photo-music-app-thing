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

module.exports = Contributor;