const { connection, User, Project } = require('../../db');
const expect = require('chai').use(require('chai-as-promised')).expect;

describe('Project Model', () => {
  let localUser = {
    username: 'test',
    password: 'test'
  };
  let oAuthUser = {
    oAuthUserId: 1234,
    oAuthProvider: 'facebook'
  };

  beforeEach(() => {
    return connection.reset()
      .then(() => {
        return User.create(localUser);
      })
      .then((newUser) => {
        localUser = newUser;
        return User.create(oAuthUser);
      })
      .then((newUser) => {
        oAuthUser = newUser;
      });
  });

  describe('create()', () => {
    it('Should create project with all-valid parameters', () => {
      return Project.create({
        ownerId: localUser.id,
        name: 'test project',
        description: 'this is a project',
        tagline: 'brett kirk!'
      })
        .then((project) => {
          expect(project.id).to.exist;
          expect(project.name).to.equal('test project');
          expect(project.description).to.equal('this is a project');
          expect(project.tagline).to.equal('brett kirk!');
        });
    });
    it('Should create project without a description or tagline', () => {
      return Project.create({
        ownerId: localUser.id,
        name: 'test project'
      })
        .then((project) => {
          expect(project.id).to.exist;
          expect(project.name).to.equal('test project');
        });
    });
    it('Should reject when creating a project without a name', () => {
      return expect(Project.create({
        ownerId: localUser.id
      })).to.be.rejected;
    });
  });

  describe('update()', () => {
    it('Should update a project with all-valid parameters', () => {
      return Project.create({
        ownerId: localUser.id,
        name: 'test project'
      })
        .then((project) => {
          // return Project.update(); // TODO - finish implementing
        });
    });
    it('Should reject when updating a project that you are not a contributor of', () => {
    });
    it('Should reject when attempting to change the ownership of a project that you are a contributor to', () => {
    });
    it('Should succeed when giving up ownership of a project that you own to someone else', () => {
    });
  });

  describe('addContributor()', () => {
    it('Should add contributors to an existing project when adding as the project owner', () => {
      return Project.create({
        ownerId: localUser.id,
        name: 'test project'
      })
        .then((project) => {
          return Project.addContributor({ownerId: localUser.id, contributorId: oAuthUser.id, projectId: project.id});
        })
        .then((response) => {
          expect(response).to.equal(true);
        });
    });
    it('Should reject when adding contributors as someone other than the project owner', () => {
      return Project.create({
        ownerId: localUser.id,
        name: 'test project'
      })
        .then((project) => {
          return expect(Project.addContributor({ownerId: oAuthUser.id, contributorId: localUser.id, projectId: project.id})).to.be.rejectedWith('Cannot add contributors to a project you do not own');
        });
    });
    it('Should reject when adding a user that is already a contributor', () => {
      return Project.create({
        ownerId: localUser.id,
        name: 'test project'
      })
        .then((project) => {
          return Project.addContributor({ownerId: localUser.id, contributorId: oAuthUser.id, projectId: project.id})
            .then(() => {
              return expect(Project.addContributor({ownerId: localUser.id, contributorId: oAuthUser.id, projectId: project.id})).to.be.rejectedWith('User is already a contributor to this project');
            });
        });
    });
    it('Should reject when adding a contributor to a non-existent project', () => {
      return Project.create({
        ownerId: localUser.id,
        name: 'test project'
      })
        .then((project) => {
          return expect(Project.addContributor({ownerId: localUser.id, contributorId: oAuthUser.id, projectId: project.id + 1})).to.be.rejectedWith('Project does not exist');
        });
    });
    it('Should reject when adding project owner as a contributor', () => {
      return Project.create({
        ownerId: localUser.id,
        name: 'test project'
      })
        .then((project) => {
          return expect(Project.addContributor({ownerId: localUser.id, contributorId: localUser.id, projectId: project.id})).to.be.rejectedWith('Owner cannot be added as a contributor');
        });
    });
  });

  describe('removeContributor()', () => {
    it('Should remove existing contributors when doing so as the project owner', () => {
      return Project.create({
        ownerId: localUser.id,
        name: 'test project'
      })
        .then((project) => {
          return Project.addContributor({ownerId: localUser.id, contributorId: oAuthUser.id, projectId: project.id})
            .then(() => {
              return Project.removeContributor({ownerId: localUser.id, contributorId: oAuthUser.id, projectId: project.id});
            });
        })
        .then((response) => {
          expect(response).to.equal(true);
        });
    });
    it('Should reject when removing a contributor that is not listed as a contributor to the project', () => {
      return Project.create({
        ownerId: localUser.id,
        name: 'test project'
      })
        .then((project) => {
          return expect(Project.removeContributor({ownerId: localUser.id, contributorId: oAuthUser.id, projectId: project.id})).to.be.rejectedWith('User is not a contributor to this project');
        });
    });
    it('Should reject when removing contributors as someone other than the project owner', () => {
      return Project.create({
        ownerId: localUser.id,
        name: 'test project'
      })
        .then((project) => {
          return Project.addContributor({ownerId: localUser.id, contributorId: oAuthUser.id, projectId: project.id})
            .then(() => {
              return expect(Project.removeContributor({ownerId: oAuthUser.id, contributorId: oAuthUser.id, projectId: project.id})).to.be.rejectedWith('Cannot remove contributors from a project you do not own');
            });
        });
    });
    it('Should reject when removing a contributor from a non-existent project', () => {
      return Project.create({
        ownerId: localUser.id,
        name: 'test project'
      })
        .then((project) => {
          return expect(Project.removeContributor({ownerId: localUser.id, contributorId: oAuthUser.id, projectId: project.id + 1})).to.be.rejectedWith('Project does not exist');
        });
    });
  });

  describe('getContributors()', () => {
    it('Should retrieve contributors from an existing project', () => {
      return Project.create({
        ownerId: localUser.id,
        name: 'test project'
      })
        .then((project) => {
          return Project.addContributor({ownerId: localUser.id, contributorId: oAuthUser.id, projectId: project.id})
            .then(() => {
              return Project.getContributors(project.id);
            });
        })
        .then((contributors) => {
          expect(contributors).to.exist;
          expect(contributors).to.be.a('array');
          expect(contributors.length).to.equal(1);
          expect(contributors[0].id).to.equal(oAuthUser.id);
        });
    });
    it('Should reject when retrieving contributors from a non-existent project', () => {
    });
  });
});