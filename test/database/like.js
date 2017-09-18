const { connection, Like, User, Project } = require('../../db');
const expect = require('chai').use(require('chai-as-promised')).expect;

describe('Like Model', () => {
  let userOne = {
    username: 'test',
    password: 'test',
    name: 'test'
  };
  let userTwo = {
    oAuthUserId: 1234,
    oAuthProvider: 'facebook',
    name: 'test2'
  };
  let project = {
    name: 'test project',
    description: 'this is a project'
  };

  beforeEach(() => {
    return connection.reset()
      .then(() => {
        return User.create(userOne);
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
        return Like.create({userId: userTwo.id, parentClass: Project, parentId: project.id});
      });
  });

  describe('create()', () => {
    it('Should create like when all parameters are valid', () => {
      return Like.create({userId: userOne.id, parentClass: Project, parentId: project.id})
        .then((response) => {
          expect(response).to.equal(true);
        });
    });
    it('Should reject when liking an item that you have already liked', () => {
      return Like.create({userId: userOne.id, parentClass: Project, parentId: project.id})
        .then(() => {
          return expect(Like.create({userId: userOne.id, parentClass: Project, parentId: project.id})).to.be.rejectedWith('You have already liked this item');
        });
    });
    it('Should reject when userId does not map to an existing user', () => {
      return expect(Like.create({userId: 1234, parentClass: Project, parentId: project.id})).to.be.rejectedWith('User does not exist');
    });
    it('Should reject when model string is not setup in like.js model file', () => {
      return expect(Like.create({userId: userOne.id, parentClass: 'asdf', parentId: project.id})).to.be.rejectedWith('Like parent model not defined');
    });
    it('Should reject when model ID does not map to an existing model of the type provided', () => {
      return expect(Like.create({userId: userOne.id, parentClass: Project, parentId: 1234})).to.be.rejectedWith('does not exist');
    });
  });

  describe('delete()', () => {
    it('Should successfully delete likes when all parameters are valid', () => {
      return Like.create({userId: userOne.id, parentClass: Project, parentId: project.id})
        .then(() => {
          return Like.delete({userId: userOne.id, parentClass: Project, parentId: project.id});
        })
        .then((response) => {
          expect(response).to.equal(true);
        });
    });
    it('Should reject when deleting a like that does not exist', () => {
      return expect(Like.delete({userId: userOne.id, parentClass: Project, parentId: project.id})).to.be.rejectedWith('Like does not exist');
    });
    it('Should reject when userId does not map to an existing user', () => {
      return expect(Like.delete({userId: 1234, parentClass: Project, parentId: project.id})).to.be.rejectedWith('User does not exist');
    });
    it('Should reject when model string is not setup in like.js model file', () => {
      return expect(Like.delete({userId: userOne.id, parentClass: 'asdf', parentId: project.id})).to.be.rejectedWith('Like parent model not defined');
    });
    it('Should reject when model ID does not map to an existing model of the type provided', () => {
      return expect(Like.delete({userId: userOne.id, parentClass: Project, parentId: 1234})).to.be.rejectedWith('does not exist');
    });
  });

  describe('getCountByParent()', () => {
    it('Should get all likes on a model when parameters are valid', () => {
      return Like.getCountByParent({parentClass: Project, parentId: project.id})
        .then((likes) => {
          expect(likes).to.be.a('number');
          expect(likes).to.equal(1);
        });
    });
    it('Should reject when parent type is not setup in like.js', () => {
      return expect(Like.getCountByParent({parentClass: 'asdf', parentId: project.id})).to.be.rejectedWith('Like parent model not defined');
    });
    it('Should reject when parent ID does not map to existing parent model', () => {
      return expect(Like.getCountByParent({parentClass: Project, parentId: 1234})).to.be.rejectedWith('does not exist');
    });
  });

  describe('getParentIsLikedByUser()', () => {
    it('Should return false for a user that has not liked an item', () => {
      return expect(Like.getParentIsLikedByUser({parentClass: Project, parentId: project.id, userId: userOne.id})).to.eventually.equal(false);
    });
    it('Should return true for a user that has liked an item', () => {
      return Like.create({userId: userOne.id, parentClass: Project, parentId: project.id})
        .then(() => {
          return expect(Like.getParentIsLikedByUser({parentClass: Project, parentId: project.id, userId: userOne.id})).to.eventually.equal(true);
        });
    });
    it('Should reject when user does not exist', () => {
      return expect(Like.getParentIsLikedByUser({parentClass: Project, parentId: project.id, userId: 1234})).to.be.rejectedWith('User does not exist');
    });
    it('Should reject when parent does not exist', () => {
      return expect(Like.getParentIsLikedByUser({parentClass: Project, parentId: 1234, userId: userOne.id})).to.be.rejectedWith('Project does not exist');
    });
    it('Should reject when parent type is not setup in like.js', () => {
      return expect(Like.getParentIsLikedByUser({parentClass: 'asdf', parentId: project.id, userId: userOne.id})).to.be.rejectedWith('Like parent model not defined');
    });
  });

  describe('getOne()', () => {
    it('Should get like if it exists', () => {
      return Like.getOne({userId: userTwo.id, parentClass: Project, parentId: project.id})
        .then((like) => {
          expect(like.userId).to.equal(userTwo.id);
        });
    });
    it('Should reject when like does not exist', () => {
      return expect(Like.getOne({userId: userOne.id, parentClass: Project, parentId: project.id})).to.be.rejectedWith('Like does not exist');
    });
    it('Should reject when parent type is not registered in like.js', () => {
      return expect(Like.getOne({userId: userTwo.id, parentClass: 'asdf', parentId: 1234})).to.be.rejectedWith('Like parent model not defined');
    });
    it('Should reject when parent ID does not map to existing parent model', () => {
      return expect(Like.getOne({userId: userTwo.id, parentClass: Project, parentId: 1234})).to.be.rejectedWith('does not exist');
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