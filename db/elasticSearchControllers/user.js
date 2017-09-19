const elasticSearch = require('../../elasticSearch');
const dbUser = require('../models/user');
const dbProject = require('../models/project');
const dbProjectComponent = require('../models/projectComponent');

let User = {...dbUser};

User.create = (input) => {
  return dbUser.create(input)
    .then((user) => {
      elasticSearch.indexUser(user.id);
      return user;
    });
};

User.update = (userId, query) => {
  return dbUser.update(userId, query)
    .then((user) => {
      elasticSearch.indexUser(user.id);
      dbProjectComponent.getByUser(user.id)
        .then((components) => {
          components.forEach((component) => {
            elasticSearch.indexProjectComponent(component.id);
          });
        });
      dbProject.getByUser(user.id)
        .then((projects) => {
          projects.forEach((project) => {
            elasticSearch.indexProject(project.id);
          });
        });
      return user;
    });
};

module.exports = User;