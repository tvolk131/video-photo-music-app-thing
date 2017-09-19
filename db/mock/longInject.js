let mockUsers = require('./mockUsers.json');
let mockProjects = require('./mockProjects.json');
let mockComponents = require('./mockComponents.json');
let mockContributors = require('./mockContributors.json');
let injector = require('./injector');

injector({
  users: mockUsers,
  projects: mockProjects,
  components: mockComponents,
  contributors: mockContributors
});