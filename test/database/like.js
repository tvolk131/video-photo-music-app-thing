const { connection, Like, User, Project } = require('../../db');
const expect = require('chai').use(require('chai-as-promised')).expect;

describe('Like Model', () => {
  let userOne = {
    username: 'test',
    password: 'test'
  };
  let userTwo = {
    oAuthUserId: 1234,
    oAuthProvider: 'facebook'
  };
  let project = {
    name: 'test project',
    description: 'this is a project'
  };

  beforeEach(() => {
    return connection.reset()
      .then(() => {
        return User.create(userTwo);
      })
      .then((newUser) => {
        userOne = newUser;
        project.ownerId = userOne.id;
        return User.create(userTwo);
      })
      .then((newUser) => {
        userTwo = newUser;
        return Project.create(project);
      })
      .then((newProject) => {
        project = newProject;
      })
      .then(() => {
        return Like.create(userTwo.id, 'project', project.id);
      });
  });

  describe('create()', () => {
    it('Should create like when all parameters are valid', () => {
      return Like.create(userOne.id, 'project', project.id)
        .then((response) => {
          expect(response).to.equal(true);
        });
    });
    it('Should reject when liking an item that you have already liked', () => {
      return Like.create(userOne.id, 'project', project.id)
        .then(() => {
          return expect(Like.create(userOne.id, 'project', project.id)).to.be.rejectedWith('You have already liked this item');
        });
    });
    it('Should reject when userId does not map to an existing user', () => {
      return expect(Like.create(1234, 'project', project.id)).to.be.rejectedWith('User does not exist');
    });
    it('Should reject when model string is not setup in like.js model file', () => {
      return expect(Like.create(userOne.id, 'asdf', project.id)).to.be.rejectedWith('Like parent model not defined');
    });
    it('Should reject when model ID does not map to an existing model of the type provided', () => {
      return expect(Like.create(userOne.id, 'project', 1234)).to.be.rejectedWith('does not exist');
    });
  });

  describe('delete()', () => {
    it('Should successfully delete likes when all parameters are valid', () => {
      return Like.create(userOne.id, 'project', project.id)
        .then(() => {
          return Like.delete(userOne.id, 'project', project.id);
        })
        .then((response) => {
          expect(response).to.equal(true);
        });
    });
    it('Should reject when deleting a like that does not exist', () => {
      return expect(Like.delete(userOne.id, 'project', project.id)).to.be.rejectedWith('Like does not exist');
    });
    it('Should reject when userId does not map to an existing user', () => {
      return expect(Like.delete(1234, 'project', project.id)).to.be.rejectedWith('User does not exist');
    });
    it('Should reject when model string is not setup in like.js model file', () => {
      return expect(Like.delete(userOne.id, 'asdf', project.id)).to.be.rejectedWith('Like parent model not defined');
    });
    it('Should reject when model ID does not map to an existing model of the type provided', () => {
      return expect(Like.delete(userOne.id, 'project', 1234)).to.be.rejectedWith('does not exist');
    });
  });

  describe('getByParent()', () => {
    it('Should get all likes on a model when parameters are valid', () => {
      return Like.getByParent('project', project.id)
        .then((likes) => {
          expect(likes).to.be.a('array');
          expect(likes.length).to.equal(1);
          expect(likes[0].parentId).to.equal(project.id);
        });
    });
    it('Should reject when parent type is not setup in like.js', () => {
      return expect(Like.getByParent('asdf', 1234)).to.be.rejectedWith('Like parent model not defined');
    });
    it('Should reject when parent ID does not map to existing parent model', () => {
      return expect(Like.getByParent('project', 1234)).to.be.rejectedWith('does not exist');
    });
  });

  describe('getOne()', () => {
    it('Should get like if it exists', () => {
      return Like.getOne(userTwo.id, 'project', project.id)
        .then((like) => {
          expect(like.userId).to.equal(userTwo.id);
        });
    });
    it('Should reject when like does not exist', () => {
      return expect(Like.getOne(userOne.id, 'project', project.id)).to.be.rejectedWith('Like does not exist');
    });
    it('Should reject when parent type is not registered in like.js', () => {
      return expect(Like.getByParent(userTwo.id, 'asdf', 1234)).to.be.rejectedWith('Like parent model not defined');
    });
    it('Should reject when parent ID does not map to existing parent model', () => {
      return expect(Like.getOne(userTwo.id, 'project', 1234)).to.be.rejectedWith('does not exist');
    });
  });

  describe('getByUser()', () => {
    it('Should return likes when all parameters are valid', () => {
      return Like.getByUser(userOne.id)
        .then((likes) => {
          expect(likes.length).to.equal(0);
          return Like.getByUser(userTwo.id);
        })
        .then((likes) => {
          expect(likes.length).to.equal(1);
        });
    });
    it('Should reject when userId does not map to an existing user', () => {
      return expect(Like.getByUser(1234)).to.be.rejectedWith('User does not exist');
    });
  });
});