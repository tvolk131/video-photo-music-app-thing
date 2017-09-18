const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLNonNull } = require('graphql');
const { UserType, ProjectType, CommentType } = require('../types');
const db = require('../../../db');

module.exports = {
  createProject: {
    type: ProjectType,
    args: {
      name: {type: new GraphQLNonNull(GraphQLString)},
      description: {type: GraphQLString},
      tagline: {type: GraphQLString},
      thumbnailUrl: {type: GraphQLString},
    },
    resolve(parentValue, {name, description, tagline, thumbnailUrl}, request) {
      if (!request.user) {
        return Promise.reject('Cannot create a project when you are not logged in');
      }
      return db.Project.create({ownerId: request.user.id, name, description, tagline, thumbnailUrl});
    }
  },
  editProject: {
    type: ProjectType,
    args: {
      id: {type: new GraphQLNonNull(GraphQLInt)},
      name: {type: GraphQLString},
      description: {type: GraphQLString},
      tagline: {type: GraphQLString}
    },
    resolve(parentValue, {id, name, description, tagline}, request) {
      if (!request.user) {
        return Promise.reject('Cannot edit a project when you are not logged in');
      }
      let args = {name, description, tagline}
      clearUndefinedVals(args);
      return db.Project.update({userId: request.user.id, projectId: id, options: args});
    }
  },
  addProjectTag: {
    type: GraphQLBoolean,
    args: {
      projectId: {type: new GraphQLNonNull(GraphQLInt)},
      text: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve(parentValue, {projectId, text}, request) {
      if (!request.user) {
        return Promise.reject('Cannot add tag to project when you are not logged in');
      }
      return db.Project.addTag({
        userId: request.user.id,
        projectId,
        text
      });
    }
  },
  removeProjectTag: {
    type: GraphQLBoolean,
    args: {
      projectId: {type: new GraphQLNonNull(GraphQLInt)},
      text: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve(parentValue, {projectId, text}, request) {
      if (!request.user) {
        return Promise.reject('Cannot remove tag to project when you are not logged in');
      }
      return db.Project.removeTag({
        userId: request.user.id,
        projectId,
        text
      });
    }
  },
  deleteProject: {
    type: ProjectType,
    args: {
      id: {type: new GraphQLNonNull(GraphQLInt)}
    },
    resolve(parentValue, {id}, request) {
      if (!request.user) {
        return Promise.reject('Cannot delete a project when you are not logged in');
      }
      return db.Project.delete(request.user.id, id);
    }
  },
  addProjectContributor: {
    type: UserType,
    args: {
      userId: {type: new GraphQLNonNull(GraphQLInt)},
      projectId: {type: new GraphQLNonNull(GraphQLInt)},
      role: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve(parentValue, {userId, projectId, role}, request) {
      if (!request.user) {
        return Promise.reject('Cannot add contributor when you are not logged in');
      }
      return db.Project.addContributor({ownerId: request.user.id, contributorId: userId, projectId, role});
    }
  },
  removeProjectContributor: {
    type: UserType,
    args: {
      userId: {type: new GraphQLNonNull(GraphQLInt)},
      projectId: {type: new GraphQLNonNull(GraphQLInt)}
    },
    resolve(parentValue, {userId, projectId}, request) {
      if (!request.user) {
        return Promise.reject('Cannot remove contributor when you are not logged in');
      }
      return db.Project.removeContributor({ownerId: request.user.id, contributorId: userId, projectId});
    }
  },
  likeProject: {
    type: GraphQLBoolean,
    args: {
      projectId: {type: new GraphQLNonNull(GraphQLInt)}
    },
    resolve(parentValue, {projectId}, request) {
      return db.Project.Like.create({userId: request.user.id, projectId});
    }
  },
  unlikeProject: {
    type: GraphQLBoolean,
    args: {
      projectId: {type: new GraphQLNonNull(GraphQLInt)}
    },
    resolve(parentValue, {projectId}, request) {
      return db.Project.Like.delete({userId: request.user.id, projectId});
    }
  },
  createProjectComment: {
    type: CommentType,
    args: {
      projectId: {type: new GraphQLNonNull(GraphQLInt)},
      text: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve(parentValue, {projectId, text}, request) {
      return db.Project.Comment.create({userId: request.user.id, projectId, text});
    }
  }
};