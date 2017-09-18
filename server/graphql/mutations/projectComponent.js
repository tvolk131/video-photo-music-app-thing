const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLNonNull } = require('graphql');
const { ProjectComponentType, CommentType } = require('../types');
const db = require('../../../db');

module.exports = {
  createProjectComponent: {
    type: ProjectComponentType,
    args: {
      projectId: {type: new GraphQLNonNull(GraphQLInt)},
      name: {type: new GraphQLNonNull(GraphQLString)},
      type: {type: new GraphQLNonNull(GraphQLString)},
      resourceUrl: {type: new GraphQLNonNull(GraphQLString)},
      description: {type: GraphQLString},
      isDownloadable: {type: new GraphQLNonNull(GraphQLBoolean)},
      thumbnailUrl: {type: GraphQLString},
    },
    resolve(parentValue, {projectId, name, type, resourceUrl, description, isDownloadable, thumbnailUrl}, request) {
      if (!request.user) {
        return Promise.reject('Cannot create a project component when you are not logged in');
      }
      return db.ProjectComponent.create({userId: request.user.id, projectId, name, type, resourceUrl, description, isDownloadable, thumbnailUrl});
    }
  },
  editProjectComponent: {
    type: ProjectComponentType,
    args: {
      id: {type: new GraphQLNonNull(GraphQLInt)},
      name: {type: GraphQLString},
      type: {type: GraphQLString},
      resourceUrl: {type: GraphQLString},
      description: {type: GraphQLString},
      isDownloadable: {type: GraphQLBoolean}
    },
    resolve(parentValue, {id, name, type, resourceUrl, description, isDownloadable}, request) {
      if (!request.user) {
        return Promise.reject('Cannot edit a project component when you are not logged in');
      }
      let args = {name, type, resourceUrl, description, isDownloadable};
      clearUndefinedVals(args);
      return db.ProjectComponent.update(request.user.id, id, args);
    }
  },
  deleteProjectComponent: {
    type: ProjectComponentType,
    args: {
      id: {type: new GraphQLNonNull(GraphQLInt)}
    },
    resolve(parentValue, {id}, request) {
      if (!request.user) {
        return Promise.reject('Cannot delete a project component when you are not logged in');
      }
      return db.ProjectComponent.delete(request.user.id, id);
    }
  },
  setFeaturedProjectComponent: {
    type: GraphQLBoolean,
    args: {
      projectComponentId: {type: new GraphQLNonNull(GraphQLInt)}
    },
    resolve(parentValue, {projectComponentId}, request) {
      if (!request.user) {
        return Promise.reject('Cannot set featured component when you are not logged in');
      }
      return db.ProjectComponent.setAsFeatured({userId: request.user.id, componentId: projectComponentId});
    }
  },
  likeComponent: {
    type: GraphQLBoolean,
    args: {
      projectComponentId: {type: new GraphQLNonNull(GraphQLInt)}
    },
    resolve(parentValue, {projectComponentId}, request) {
      return db.ProjectComponent.Like.create({userId: request.user.id, projectComponentId});
    }
  },
  unlikeComponent: {
    type: GraphQLBoolean,
    args: {
      projectComponentId: {type: new GraphQLNonNull(GraphQLInt)}
    },
    resolve(parentValue, {projectComponentId}, request) {
      return db.ProjectComponent.Like.delete({userId: request.user.id, projectComponentId});
    }
  },
  createProjectComponentComment: {
    type: CommentType,
    args: {
      projectComponentId: {type: new GraphQLNonNull(GraphQLInt)},
      text: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve(parentValue, {projectComponentId, text}, request) {
      return db.ProjectComponent.Comment.create({userId: request.user.id, projectComponentId, text});
    }
  }
};