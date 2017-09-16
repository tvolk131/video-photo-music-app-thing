const elasticSearch = require('../../elasticSearch');
const dbProject = require('../models/project');
const dbUser = require('../models/user');

let Project = {...dbProject};

Project.create = (input) => {
  return dbProject.create(input)
    .tap((project) => {
      dbUser.getById(project.ownerId)
        .then((owner) => {
          elasticSearch.indexProject(project, owner);
        });
    });
};

Project.update = (input) => {
  return dbProject.update(input)
    .tap((project) => {
      dbUser.getById(project.ownerId)
        .then((owner) => {
          elasticSearch.indexProject(project, owner);
        });
    });
};

Project.delete = (userId, projectId) => {
  return dbProject.delete(userId, projectId)
    .tap(() => {
      elasticSearch.deleteProject(projectId);
    });
};

module.exports = Project;