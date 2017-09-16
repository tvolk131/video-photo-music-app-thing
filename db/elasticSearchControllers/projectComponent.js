const elasticSearch = require('../../elasticSearch');
const dbProjectComponent = require('../models/projectComponent');
const dbUser = require('../models/user');

let ProjectComponent = {...dbProjectComponent};

ProjectComponent.create = (input) => {
  return dbProjectComponent.create(input)
    // TODO - Find a way to use 'tap' instead of 'then' here
    .then((projectComponent) => {
      dbUser.getById(projectComponent.authorId)
        .then((author) => {
          elasticSearch.indexProjectComponent(projectComponent, author);
        });
      return projectComponent;
    });
};

ProjectComponent.update = (userId, componentId, options) => {
  return dbProjectComponent.update(userId, componentId, options)
    .tap((projectComponent) => {
      dbUser.getById(projectComponent.authorId)
        .then((author) => {
          elasticSearch.indexProjectComponent(projectComponent, author);
        });
    });
};

ProjectComponent.delete = (userId, componentId) => {
  return dbProjectComponent.delete(userId, componentId)
    .tap(() => {
      elasticSearch.deleteProjectComponent(componentId);
    });
};

module.exports = ProjectComponent;