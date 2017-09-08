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
      return Comment.create({userId: userOne.id, parentClass: Project, parentId: project.id, text: 'this is a comment'})
        .then((comment) => {
          expect(comment).to.exist;
          expect(comment.userId).to.equal(userOne.id);
          expect(comment.parentType).to.equal('project');
          expect(comment.parentId).to.equal(project.id);
          expect(comment.text).to.equal('this is a comment');
        });
    });
    it('Should reject when userId does not map to an existing user', () => {
      return expect(Comment.create({userId: 1234, parentClass: Project, parentId: project.id, text: 'this is a comment'})).to.be.rejectedWith('User does not exist');
    });
    it('Should reject when comment type is not registered in model file', () => {
      return expect(Comment.create({userId: userOne.id, parentClass: 'asdf', parentId: project.id, text: 'this is a comment'})).to.be.rejectedWith('Comment parent model not defined');
    });
    it('Should reject when projectId does not map to an existing project', () => {
      return expect(Comment.create({userId: userOne.id, parentClass: Project, parentId: 1234, text: 'this is a comment'})).to.be.rejectedWith('does not exist');
    });
    it('Should reject when comment text is empty', () => {
      return expect(Comment.create({userId: userOne.id, parentClass: Project, parentId: project.id, text: ''})).to.be.rejectedWith('Comment text cannot be empty');
    });
  });

  describe('edit()', () => {
    it('Should edit comment when all parameters are valid', () => {
      return Comment.create({userId: userOne.id, parentClass: Project, parentId: project.id, text: 'this is a comment'})
        .then((comment) => {
          return Comment.edit({userId: userOne.id, commentId: comment.id, text: 'new comment text'});
        })
        .then((comment) => {
          expect(comment.text).to.equal('new comment text');
        });
    });
    it('Should not modify other values when changing comment text', () => {
      return Comment.create({userId: userOne.id, parentClass: Project, parentId: project.id, text: 'this is a comment'})
        .then((comment) => {
          return Comment.edit({userId: userOne.id, commentId: comment.id, text: 'new comment text'});
        })
        .then((comment) => {
          expect(comment.userId).to.equal(userOne.id);
        });
    });
    it('Should reject when attempting to edit another user\'s comment', () => {
      return Comment.create({userId: userOne.id, parentClass: Project, parentId: project.id, text: 'this is a comment'})
        .then((comment) => {
          return expect(Comment.edit({userId: userTwo.id, commentId: comment.id, text: 'new comment text'})).to.be.rejectedWith('Cannot edit a comment you do not own');
        });
    });
    it('Should reject when attempting to change comment text to an empty string', () => {
      return Comment.create({userId: userOne.id, parentClass: Project, parentId: project.id, text: 'this is a comment'})
        .then((comment) => {
          return expect(Comment.edit({userId: userOne.id, commentId: comment.id, text: ''})).to.be.rejectedWith('Comment text cannot be empty');
        });
    });
    it('Should reject when userId does not map to an existing user', () => {
      return expect(Comment.edit({userId: 1234, commentId: null, text: 'asdf'})).to.be.rejectedWith('User does not exist');
    });
    it('Should reject when commentId does not map to an existing comment', () => {
      return expect(Comment.edit({userId: userOne.id, commentId: 1234, text: 'asdf'})).to.be.rejectedWith('Comment does not exist');
    });
  });

  describe('delete()', () => {
    it('Should delete comment when all parameters are valid', () => {
      return Comment.create({userId: userOne.id, parentClass: Project, parentId: project.id, text: 'this is a comment'})
        .then((comment) => {
          return Comment.delete({userId: userOne.id, commentId: comment.id});
        })
        .then((response) => {
          expect(response).to.equal(true);
        });
    });
    it('Should reject when userId does not map to an existing user', () => {
      return expect(Comment.delete({userId: 1234})).to.be.rejectedWith('User does not exist');
    });
    it('Should reject when commentId does not map to an existing comment', () => {
      return expect(Comment.delete({userId: userOne.id, commentId: 1234})).to.be.rejectedWith('Comment does not exist');
    });
    it('Should reject when attempting to delete another user\'s comment', () => {
      return Comment.create({userId: userOne.id, parentClass: Project, parentId: project.id, text: 'this is a comment'})
        .then((comment) => {
          return expect(Comment.delete({userId: userTwo.id, commentId: comment.id})).to.be.rejectedWith('Cannot delete another user\'s comment');
        });
    });
  });

  describe('getByUser()', () => {
    it('Should return comments when all input parameters are valid', () => {
      return Comment.create({userId: userOne.id, parentClass: Project, parentId: project.id, text: 'this is a comment'})
        .then((comment) => {
          return Comment.getByUser(userOne.id)
            .then((comments) => {
              expect(comments.length).to.equal(1);
              expect(comments[0].text).to.equal('this is a comment');
            });
        });
    });
    it('Should return empty array when user has no comments', () => {
      return Comment.getByUser(userOne.id)
        .then((comments) => {
          expect(comments).to.eql([]);
        });
    });
    it('Should reject when userId does not map to an existing user', () => {
      return expect(Comment.getById(1234)).to.be.rejectedWith('Comment does not exist');
    });
  });

  describe('getByParent()', () => {
    it('Should get comments when all input parameters are valid', () => {
      return Comment.create({userId: userOne.id, parentClass: Project, parentId: project.id, text: 'this is a comment'})
        .then((comment) => {
          return Comment.getByParent({parentClass: Project, parentId: project.id});
        })
        .then((comments) => {
          expect(comments).to.be.a('array');
          expect(comments[0].text).to.equal('this is a comment');
        });
    });
    it('Should reject when parent type is not registered in comment.js', () => {
      return expect(Comment.getByParent({parentClass: 'asdf', parentId: 1234})).to.be.rejectedWith('Comment parent model not defined');
    });
    it('Should reject when parent ID does not map to existing parent model', () => {
      return expect(Comment.getByParent({parentClass: Project, parentId: 1234})).to.be.rejectedWith('does not exist');
    });
  });

  describe('getById()', () => {
    it('Should return model if ID maps to an existing comment', () => {
      return Comment.create({userId: userOne.id, parentClass: Project, parentId: project.id, text: 'this is a comment'})
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