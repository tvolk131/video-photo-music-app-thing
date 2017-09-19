let mockData = require('./mockData.json');
let injector = require('./injector');

injector({
  users: mockData.users,
  projects: mockData.projects,
  components: mockData.components,
  contributors: mockData.contributors
});