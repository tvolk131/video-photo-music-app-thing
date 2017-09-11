let mockData = require('./mockData.json');
let db = require('../');

const injectMockData = () => {
  db.connection.reset()
    .catch(() => {
      setTimeout(injectMockData, 500);
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
      let promises = [];
      mockData.projectComments.forEach((projectCommentObj) => {
        promises.push(
          db.Project.Comment.create(projectCommentObj)
        );
      });
      return Promise.all(promises);
    })
    .then(() => {
      let promises = [];
      mockData.projectComponentComments.forEach((projectComponentCommentObj) => {
        promises.push(
          db.ProjectComponent.Comment.create(projectComponentCommentObj)
        );
      });
      return Promise.all(promises);
    })
    .then(() => {
      console.log();
      console.log();
      console.log('Mock data has been injected!');
    });
}

injectMockData();