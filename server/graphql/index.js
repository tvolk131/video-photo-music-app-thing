const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql');
const db = require('../../db');
const { UserType, ProjectType, ProjectComponentType, CommentType } = require('./types');
const mutations = require('./mutations');

clearUndefinedVals = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  });
};

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: {type: GraphQLInt},
        email: {type: GraphQLString},
        username: {type: GraphQLString}
      },
      resolve(parentValue, args, request) {
        if (Object.keys(args).length > 1) {
          return Promise.reject('Needs zero or one arguments but got ' + Object.keys(args).length);
        }
        if (Object.keys(args).length === 0) {
          if (!request.user) {
            return Promise.reject('You are not logged in');
          }
          return db.User.getById(request.user.id);
        }
        if (args.id) {
          return db.User.getById(args.id);
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
      args: {id: {type: new GraphQLNonNull(GraphQLInt)}},
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
  fields: mutations
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});