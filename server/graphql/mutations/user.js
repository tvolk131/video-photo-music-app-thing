const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLNonNull } = require('graphql');
const { UserType } = require('../types');
const db = require('../../../db');

module.exports = {
  editUser: {
    type: UserType,
    args: {
      email: {type: GraphQLString},
      username: {type: GraphQLString},
      theme: {type: GraphQLInt},
      name: {type: GraphQLString},
      profession: {type: GraphQLString},
      avatarUrl: {type: GraphQLString},
      description: {type: GraphQLString}
    },
    resolve(parentValue, args, request) {
      if (!request.user) {
        return Promise.reject('You are not logged in');
      }
      clearUndefinedVals(args);
      return db.User.update(request.user.id, args);
    }
  },
  editUserPassword: {
    type: GraphQLBoolean,
    args: {
      currentPassword: {type: new GraphQLNonNull(GraphQLString)},
      newPassword: {type: new GraphQLNonNull(GraphQLString)},
    },
    resolve(parentValue, {currentPassword, newPassword}, request) {
      if (!request.user) {
        return Promise.reject('You are not logged in');
      }
      return db.User.updatePassword({userId: request.user.id, currentPassword, newPassword});
    }
  },
  followUser: {
    type: UserType,
    args: {
      userId: {type: new GraphQLNonNull(GraphQLInt)}
    },
    resolve(parentValue, {userId}, request) {
      if (!request.user) {
        return Promise.reject('Cannot follow a user when you are not logged in');
      }
      return db.User.follow(request.user.id, userId);
    }
  },
  unfollowUser: {
    type: UserType,
    args: {
      userId: {type: new GraphQLNonNull(GraphQLInt)}
    },
    resolve(parentValue, {userId}, request) {
      if (!request.user) {
        return Promise.reject('Cannot unfollow a user when you are not logged in');
      }
      return db.User.unfollow(request.user.id, userId);
    }
  }
};