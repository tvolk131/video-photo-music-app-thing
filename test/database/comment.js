const { connection, User, Comment } = require('../../db');
const expect = require('chai').use(require('chai-as-promised')).expect;

describe('Comment Model', () => {
  let userOne = {
    username: 'test',
    password: 'test'
  };
  let userTwo = {
    oAuthUserId: 1234,
    oAuthProvider: 'facebook'
  };

  beforeEach(() => {
    return connection.reset()
      .then(() => {
        return User.create(userTwo);
      })
      .then((newUser) => {
        userOne = newUser;
        return User.create(userTwo);
      })
      .then((newUser) => {
        userTwo = newUser;
      });
  });

  describe('create()', () => {
    it('Should create comment when all parameters are valid', () => {
    });
    it('Should reject when userId does not map to an existing user', () => {
    });
    it('Should reject when projectId does not map to an existing project', () => {
    });
    it('Should reject when comment text is empty', () => {
    });
  });
  describe('edit()', () => {
    it('Should edit comment when all parameters are valid', () => {
    });
    it(`Should reject when attempting to edit another user's comment`, () => {
    });
    it('Should reject when attempting to change comment text to an empty string', () => {
    });
    it('Should reject when userId does not map to an existing user', () => {
    });
    it('Should reject when commentId does not map to an existing comment', () => {
    });
  });
  describe('delete()', () => {
    it('Should delete comment when all parameters are valid', () => {
    });
    it('Should reject when userId does not map to an existing user', () => {
    });
    it('Should reject when commentId does not map to an existing comment', () => {
    });
    it(`Should reject when attempting to delete another user's comment`, () => {
    });
  });
  describe('getByUser()', () => {
    it('Should', () => {
    });
    it('Should', () => {
    });
    it('Should', () => {
    });
    it('Should', () => {
    });
  });
  describe('getByProject()', () => {
    it('Should', () => {
    });
    it('Should', () => {
    });
    it('Should', () => {
    });
    it('Should', () => {
    });
  });
});