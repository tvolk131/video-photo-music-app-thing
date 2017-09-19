let db = require('../');

module.exports = (mockData) => {
  db.connection.reset()
    .catch(() => {
      setTimeout(injectMockData, 500);
    })
    .then(() => {
      if (mockData.users) {
        let promises = [];
        mockData.users.forEach((userObj) => {
          promises.push(
            db.User.create(userObj)
          );
        });
        return Promise.all(promises);
      }
    })
    .then(() => {
      if (mockData.projects) {
        let promises = [];
        mockData.projects.forEach((projectObj) => {
          promises.push(
            db.Project.create(projectObj)
          );
        });
        return Promise.all(promises);
      }
    })
    .then(() => {
      if (mockData.components) {
        let promises = [];
        mockData.components.forEach((projectComponentObj) => {
          promises.push(
            db.ProjectComponent.create(projectComponentObj)
          );
        });
        return Promise.all(promises);
      }
    })
    .then(() => {
      if (mockData.contributors) {
        let promises = [];
        mockData.contributors.forEach((projectContributorObj) => {
          promises.push(
            db.Project.addContributor(projectContributorObj)
          );
        });
        return Promise.all(promises);
      }
    })
    // .then(() => {
    //   let promises = [];
    //   mockData.projectComments.forEach((projectCommentObj) => {
    //     promises.push(
    //       db.Project.Comment.create(projectCommentObj)
    //     );
    //   });
    //   return Promise.all(promises);
    // })
    // .then(() => {
    //   let promises = [];
    //   mockData.projectComponentComments.forEach((projectComponentCommentObj) => {
    //     promises.push(
    //       db.ProjectComponent.Comment.create(projectComponentCommentObj)
    //     );
    //   });
    //   return Promise.all(promises);
    // })
    .then(() => {
      console.log();
      console.log();
      console.log('Mock data has been injected!');
    })
    .catch(err => console.log(err));
};