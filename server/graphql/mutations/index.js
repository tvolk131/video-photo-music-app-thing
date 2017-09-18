const commentMutations = require('./comment');
const projectMutations = require('./project');
const projectComponentMutations = require('./projectComponent');
const userMutations = require('./user');

module.exports = {
  ...commentMutations,
  ...projectMutations,
  ...projectComponentMutations,
  ...userMutations
};