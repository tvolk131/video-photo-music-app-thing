const User = require('../db/models/user');
const Project = require('../db/models/project');
const ProjectComponent = require('../db/models/projectComponent');
const elasticsearch = require('elasticsearch');
const _index = 'qraft';
const esClient = new elasticsearch.Client({
  host: process.env.ELASTICSEARCH_HOST || 'localhost:9200',
  log: 'error'
});
let queue = [];
module.exports.clearQueue = () => {
  if (queue.length) {
    esClient.bulk({
      body: queue
    }, (err, res) => {
      if (err) {
        console.log('Error updating elastic search indices:', err);
      } else {
        console.log('Elastic search indices updated');
      }
    });
    queue = [];
  }
};

setInterval(module.exports.clearQueue, process.env.ELASTICSEARCH_UPDATE_INTERVAL || 5000);

/////////////////////////////////////////////////////////////////////////
//////////////////////---Elasticsearch Functions---//////////////////////
/////////////////////////////////////////////////////////////////////////

// TODO - Test this function
module.exports.indexProject = (projectId) => {
  let project;
  let tags;
  let likeCount;
  return Project.getById(projectId)
    .then((_project) => {
      project = _project;
      return Project.getTags(projectId);
    })
    .then((_tags) => {
      tags = _tags;
      return Project.Like.getCount(projectId);
    })
    .then((_likeCount) => {
      likeCount = _likeCount;
      return User.getById(project.ownerId);
    })
    .then((owner) => {
      queue.push({index: {_index, _type: 'project', _id: project.id}});
      queue.push({
        name: project.name,
        description: project.description,
        thumbnailUrl: project.thumbnailUrl,
        tags,
        likeCount,
        owner: {
          username: owner.username,
          name: owner.name,
          avatarUrl: owner.avatarUrl
        }
      });
    });
};

module.exports.deleteProject = (projectId) => {
  queue.push({delete: {_index, _type: 'project', _id: projectId}});
};

module.exports.indexUser = (userId) => {
  return User.getById(userId)
    .then((user) => {
      queue.push({index: {_index, _type: 'user', _id: user.id}});
      queue.push({
        username: user.username,
        name: user.name,
        profession: user.profession,
        avatarUrl: user.avatarUrl
      });
    });
};

module.exports.indexProjectComponent = (projectComponentId) => {
  let projectComponent;
  ProjectComponent.getById(projectComponentId)
    .then((_projectComponent) => {
      projectComponent = _projectComponent;
      return User.getById(projectComponent.authorId);
    })
    .then((author) => {
      queue.push({index: {_index, _type: 'projectComponent', _id: projectComponent.id}});
      queue.push({
        name: projectComponent.name,
        description: projectComponent.description,
        thumbnailUrl: projectComponent.thumbnailUrl,
        author: {
          username: author.username,
          name: author.name,
          profession: author.profession,
          avatarUrl: author.avatarUrl
        }
      });
    });
};

module.exports.deleteProjectComponent = (componentId) => {
  queue.push({delete: {_index, _type: 'projectComponent', _id: componentId}});
};