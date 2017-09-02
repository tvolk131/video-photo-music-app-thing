const { connection, User, Comment, Project } = require('../../db');
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
      });
  });

  describe('create()', () => {
    it('Should create comment when all parameters are valid', () => {
      return Comment.create(userOne.id, 'project', project.id, 'this is a comment')
        .then((comment) => {
          expect(comment).to.exist;
          expect(comment.userId).to.equal(userOne.id);
          expect(comment.parentType).to.equal('project');
          expect(comment.parentId).to.equal(project.id);
          expect(comment.text).to.equal('this is a comment');
        });
    });
    it('Should reject when userId does not map to an existing user', () => {
      return expect(Comment.create(1234, 'project', project.id, 'this is a comment')).to.be.rejectedWith('User does not exist');
    });
    it('Should reject when comment type is not registered in model file', () => {
      return expect(Comment.create(userOne.id, 'asdf', project.id, 'this is a comment')).to.be.rejectedWith(`Comment parent model not defined`);
    });
    it('Should reject when projectId does not map to an existing project', () => {
      return expect(Comment.create(userOne.id, 'project', 1234, 'this is a comment')).to.be.rejectedWith('does not exist');
    });
    it('Should reject when comment text is empty', () => {
      return expect(Comment.create(userOne.id, 'project', project.id, '')).to.be.rejectedWith('Comment text cannot be empty');
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
  describe('getByParent()', () => {
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