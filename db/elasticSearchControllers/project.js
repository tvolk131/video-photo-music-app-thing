const elasticSearch = require('../../elasticSearch');
const dbProject = require('../models/project');
const dbUser = require('../models/user');

let Project = {...dbProject};

Project.create = (input) => {
  return dbProject.create(input)
    .then((project) => {
      elasticSearch.indexProject(project.id);
      return project;
    });
};

// TODO - Update all component indices
Project.update = (input) => {
  return dbProject.update(input)
    .then((project) => {
      elasticSearch.indexProject(project.id);
      return project;
    });
};

Project.delete = (userId, projectId) => {
  return dbProject.delete(userId, projectId)
    .then((data) => {
      elasticSearch.deleteProject(projectId);
      return data;
    });
};

Project.addTag = (input) => {
  return dbProject.addTag(input)
    .then((data) => {
      elasticSearch.indexProject(input.projectId);
      return data;
    });
};

Project.removeTag = (input) => {
  return dbProject.removeTag(input)
    .then((data) => {
      elasticSearch.indexProject(input.projectId);
      return data;
    });
};

module.exports = Project;