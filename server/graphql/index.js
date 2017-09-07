const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLSchema, GraphQLList, GraphQLNonNull} = require('graphql');
const db = require('../../db');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {type: GraphQLInt},
    oAuthUserId: {type: GraphQLString},
    oAuthProvider: {type: GraphQLString},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    username: {type: GraphQLString},
    theme: {type: GraphQLInt},
    name: {type: GraphQLString},
    handle: {type: GraphQLString},
    avatarUrl: {type: GraphQLString},
    description: {type: GraphQLString}
  }
});

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: {
    id: {type: GraphQLInt},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    tagline: {type: GraphQLString}
  }
});

const ProjectComponentType = new GraphQLObjectType({
  name: 'ProjectComponent',
  fields: {
    id: {type: GraphQLInt},
    name: {type: GraphQLString},
    resourceUrl: {type: GraphQLString},
    description: {type: GraphQLString},
    type: {type: GraphQLString},
    isDownloadable: {type: GraphQLBoolean}
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: {type: GraphQLInt},
        handle: {type: GraphQLString},
        email: {type: GraphQLString},
        username: {type: GraphQLString}
      },
      resolve(parentValue, args) {
        if (Object.keys(args).length !== 1) {
          return Promise.reject('Needs one argument but got ' + Object.keys(args).length);
        }
        if (args.id) {
          return db.User.getById(args.id);
        }
        if (args.handle) {
          return db.User.getByHandle(args.handle);
        }
        if (args.email) {
          return db.User.getByEmail(args.email);
        }
        if (args.username) {
          return db.User.getByUsername(args.username);
        }
      }
    },
    project: {
      type: ProjectType,
      args: {id: {type: GraphQLInt}},
      resolve(parentValue, args) {
        return db.Project.getById(args.id);
      }
    },
    projectComponent: {
      type: ProjectComponentType,
      args: {id: {type: GraphQLInt}},
      resolve(parentValue, args) {
        return db.ProjectComponent.getById(args.id);
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    editUser: {
      type: UserType,
      args: {
        email: {type: GraphQLString},
        username: {type: GraphQLString},
        password: {type: GraphQLString},
        theme: {type: GraphQLInt},
        name: {type: GraphQLString},
        handle: {type: GraphQLString},
        avatar: {type: GraphQLString},
        description: {type: GraphQLString}
      },
      resolve(parentValue, args, request) {
        if (!request.user) {
          return Promise.reject('You are not logged in');
        }
        return db.User.update(request.user.id, args);
      }
    },
    createProject: {
      type: ProjectType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLString},
        tagline: {type: GraphQLString}
      },
      resolve(parentValue, {name, description, tagline}, request) {
        if (!request.user) {
          return Promise.reject('Cannot create a project when you are not logged in');
        }
        return db.Project.create({ownerId: request.user.id, name, description, tagline});
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
        return db.Project.update({userId: request.user.id, projectId: id, options: {name, description, tagline}});
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
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});