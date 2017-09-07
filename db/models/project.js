const db = require('../connection');
const User = require('./user');
const Sequelize = require('sequelize');
const Comment = require('./comment');
const Like = require('./like');

const ProjectModel = db.define('projects', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(64),
    notEmpty: true,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING(256)
  },
  tagline: {
    type: Sequelize.STRING(256)
  }
});

let Project = {model: ProjectModel};

Project.create = ({ownerId, name, description, tagline}) => {
  return User.getById(ownerId)
    .then(() => {
      return Project.model.create({ownerId, name, description, tagline});
    });
};
Project.update = ({userId, projectId, options}) => {
  return Project.getById(projectId)
    .then((project) => {
      if (options.ownerId && project.ownerId !== userId) {
        return Promise.reject('Only the project owner can set another user as the owner');
      }
      return Project.getContributors(project.id)
        .then((contributors) => {
          let contributorIds = [];
          contributors.forEach((contributor) => { contributorIds.push(contributor.id); });
          return contributorIds.includes(userId) || userId === project.ownerId ? project.update(options) : Promise.reject('Must be a contributor or owner to edit project');
        });
    });
};

Project.delete = (userId, projectId) => {
  return User.getById(userId)
    .then((user) => {
      return Project.getById(projectId)
        .then((project) => {
          if (project.ownerId !== user.id) {
            return Promise.reject('Cannot delete a project that you do not own');
          }
          return project.destroy();
        })
        .then((res) => {
          return true;
        });
    });
};

Project.getById = (projectId) => {
  return Project.model.findById(projectId)
    .then((project) => {
      return project ? project : Promise.reject('Project does not exist');
    });
};

Project.getByName = (name) => {
  return Project.model.findAll({
    where: {name}
  });
};

Project.addContributor = ({ownerId, contributorId, projectId}) => {
  return Project.getById(projectId)
    .then((project) => {
      if (project.ownerId !== ownerId) {
        return Promise.reject('Cannot add contributors to a project you do not own');
      }
      return User.getById(contributorId)
        .then((user) => {
          if (user.id === ownerId) {
            return Promise.reject('Owner cannot be added as a contributor');
          }
          return project.addContributor(user)
            .then((response) => {
              return response.length ? true : Promise.reject('User is already a contributor to this project');
            });
        });
    });
};

Project.removeContributor = ({ownerId, contributorId, projectId}) => {
  return Project.getById(projectId)
    .then((project) => {
      if (project.ownerId !== ownerId) {
        return Promise.reject('Cannot remove contributors from a project you do not own');
      }
      return User.getById(contributorId)
        .then((user) => {
          return project.removeContributor(user)
            .then((response) => {
              return response ? true : Promise.reject('User is not a contributor to this project');
            });
        });
    });
};

Project.getContributors = (projectId) => {
  return Project.model.findOne({
    where: {
      id: projectId,
    },
    include: [
      {
        model: User.model,
        as: 'contributor'
      }
    ]
  })
    .then((project) => {
      return project ? project.contributor : Promise.reject('Project does not exist');
    });
};


Project.name = 'project';

Project.Comment = {};

Project.Comment.create = ({userId, projectId, text}) => {
  return Comment.create({userId, parentClass: Project, parentId: projectId, text});
};

Project.Comment.edit = Comment.edit;

Project.Comment.delete = Comment.delete;

Project.Comment.getByProject = (projectId) => {
  return Comment.getByParent({parentClass: Project, parentId: projectId});
};


Project.Like = {};

Project.Like.create = ({userId, projectId}) => {
  return Like.create({userId, parentClass: Project, parentId: projectId});
};

Project.Like.delete = ({userId, projectId}) => {
  return Like.delete({userId, parentClass: Project, parentId: projectId});
};

Project.Like.getByProject = (projectId) => {
  return Like.getByParent({parentClass: Project, parentId: projectId});
};


// TODO - Implement and test
Project.addTag = (userId, projectId, tagText) => {};

// TODO - Implement and test
Project.removeTag = (userId, projectId, tagText) => {};

// TODO - Implement and test
Project.getTags = (projectId) => {};

module.exports = Project;