const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLSchema, GraphQLList, GraphQLNonNull} = require('graphql');
const db = require('../../db');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {type: GraphQLInt},
    oAuthUserId: {type: GraphQLInt},
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
      args: {id: {type: GraphQLInt}},
      resolve(parentValue, args) {
        return db.User.getById(args.id);
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

// const mutation = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: {}
// });

module.exports = new GraphQLSchema({
  query: RootQuery
});