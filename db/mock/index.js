let mockData = require('./mockData.json');
let db = require('../');

db.connection.reset()
  .catch(() => {
    setTimeout(() => {
      console.log();
      console.log();
      console.log('Whoops, something went wrong when generating mock data. Try running the script again.');
    }, 1000);
  })
  .then(() => {
    let promises = [];
    mockData.users.forEach((userObj) => {
      promises.push(
        db.User.create(userObj)
      );
    });
    return Promise.all(promises);
  })
  .then(() => {
    let promises = [];
    mockData.projects.forEach((projectObj) => {
      promises.push(
        db.Project.create(projectObj)
      );
    });
    return Promise.all(promises);
  })
  .then(() => {
    let promises = [];
    mockData.projectContributors.forEach((projectContributorObj) => {
      promises.push(
        db.Project.addContributor(projectContributorObj)
      );
    });
    return Promise.all(promises);
  })
  .then(() => {
    let promises = [];
    mockData.projectComponents.forEach((projectComponentObj) => {
      promises.push(
        db.ProjectComponent.create(projectComponentObj)
      );
    });
    return Promise.all(promises);
  })
  .then(() => {
    console.log();
    console.log();
    console.log('Mock data has been injected!');
  });