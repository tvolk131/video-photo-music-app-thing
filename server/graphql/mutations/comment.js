const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLNonNull } = require('graphql');
const { CommentType } = require('../types');
const db = require('../../../db');

module.exports = {
  editComment: {
    type: CommentType,
    args: {
      commentId: {type: new GraphQLNonNull(GraphQLInt)},
      text: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve(parentValue, {commentId, text}, request) {
      return db.Comment.edit({userId: request.user.id, commentId, text});
    }
  },
  deleteComment: {
    type: CommentType,
    args: {commentId: {type: new GraphQLNonNull(GraphQLInt)}},
    resolve(parentValue, {commentId}, request) {
      return db.Comment.delete({userId: request.user.id, commentId});
    }
  },
  likeComment: {
    type: GraphQLBoolean,
    args: {
      commentId: {type: new GraphQLNonNull(GraphQLInt)}
    },
    resolve(parentValue, {commentId}, request) {
      return db.Comment.Like.create({userId: request.user.id, commentId});
    }
  },
  unlikeComment: {
    type: GraphQLBoolean,
    args: {
      commentId: {type: new GraphQLNonNull(GraphQLInt)}
    },
    resolve(parentValue, {commentId}, request) {
      return db.Comment.Like.delete({userId: request.user.id, commentId});
    }
  }
};