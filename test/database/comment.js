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
      return Comment.create(userOne.id, 'project', project.id, 'this is a comment')
        .then((comment) => {
          return Comment.edit(userOne.id, comment.id, 'new comment text');
        })
        .then((comment) => {
          expect(comment.text).to.equal('new comment text');
        });
    });
    it(`Should reject when attempting to edit another user's comment`, () => {
      return Comment.create(userOne.id, 'project', project.id, 'this is a comment')
        .then((comment) => {
          return expect(Comment.edit(userTwo.id, comment.id, 'new comment text')).to.be.rejectedWith('Cannot edit a comment you do not own');
        });
    });
    it('Should reject when attempting to change comment text to an empty string', () => {
      return Comment.create(userOne.id, 'project', project.id, 'this is a comment')
        .then((comment) => {
          return expect(Comment.edit(userOne.id, comment.id, '')).to.be.rejectedWith('Comment text cannot be empty');
        });
    });
    it('Should reject when userId does not map to an existing user', () => {
      return expect(Comment.edit(1234, null, 'asdf')).to.be.rejectedWith('User does not exist');
    });
    it('Should reject when commentId does not map to an existing comment', () => {
      return expect(Comment.edit(userOne.id, 1234, 'asdf')).to.be.rejectedWith('Comment does not exist');
    });
  });

  describe('delete()', () => {
    it('Should delete comment when all parameters are valid', () => {
      return Comment.create(userOne.id, 'project', project.id, 'this is a comment')
        .then((comment) => {
          return Comment.delete(userOne.id, comment.id);
        })
        .then((response) => {
          expect(response).to.equal(true);
        });
    });
    it('Should reject when userId does not map to an existing user', () => {
      return expect(Comment.delete(1234)).to.be.rejectedWith('User does not exist');
    });
    it('Should reject when commentId does not map to an existing comment', () => {
      return expect(Comment.delete(userOne.id, 1234)).to.be.rejectedWith('Comment does not exist');
    });
    it(`Should reject when attempting to delete another user's comment`, () => {
      return Comment.create(userOne.id, 'project', project.id, 'this is a comment')
        .then((comment) => {
          return expect(Comment.delete(userTwo.id, comment.id)).to.be.rejectedWith(`Cannot delete another user's comment`);
        });
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

  describe('getById()', () => {
    it('Should return model if ID maps to an existing comment', () => {
      return Comment.create(userOne.id, 'project', project.id, 'this is a comment')
        .then((comment) => {
          return Comment.getById(comment.id)
            .then((newComment) => {
              expect(comment.id).to.equal(newComment.id);
              expect(comment.text).to.equal(newComment.text);
              expect(comment.parentType).to.equal(newComment.parentType);
            });
        });
    });
    it('Should reject if ID does not map to an existing comment', () => {
    });
  });
});