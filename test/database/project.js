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
    it('Should reject when user ID does not map to an existing user', () => {
      return expect(Project.create({
        ownerId: 1234
      })).to.be.rejectedWith('User does not exist');
    });
  });

  describe('update()', () => {
    it('Should update a project with all-valid parameters as the owner', () => {
      return Project.create({
        ownerId: localUser.id,
        name: 'test project'
      })
        .then((project) => {
          return Project.update({userId: localUser.id, projectId: project.id, options: {name: 'updated project name'}});
        })
        .then((project) => {
          expect(project.name).to.equal('updated project name');
        });
    });
    it('Should only change parameters specified', () => {
      return Project.create({
        ownerId: localUser.id,
        name: 'test project'
      })
        .then((project) => {
          return Project.update({userId: localUser.id, projectId: project.id, options: {name: 'updated project name'}});
        })
        .then((project) => {
          expect(project.ownerId).to.equal(localUser.id);
        });
    });
    it('Should update a project with all-valid parameters as a contributor', () => {
      return Project.create({
        ownerId: localUser.id,
        name: 'test project'
      })
        .then((project) => {
          return Project.addContributor({ownerId: localUser.id, contributorId: oAuthUser.id, projectId: project.id})
            .then(() => {
              return Project.update({userId: oAuthUser.id, projectId: project.id, options: {name: 'updated project name'}});
            });
        })
        .then((project) => {
          expect(project.name).to.equal('updated project name');
        });
    });
    it('Should reject when updating a project that you are not the owner or contributor of', () => {
      return Project.create({
        ownerId: localUser.id,
        name: 'test project'
      })
        .then((project) => {
          return expect(Project.update({userId: oAuthUser.id, projectId: project.id, options: {name: 'updated project name'}})).to.be.rejectedWith('Must be a contributor or owner to edit project');
        });
    });
    it('Should reject when attempting to change the ownership of a project that you are a contributor to', () => {
      return Project.create({
        ownerId: localUser.id,
        name: 'test project'
      })
        .then((project) => {
          return Project.addContributor({ownerId: localUser.id, contributorId: oAuthUser.id, projectId: project.id})
            .then(() => {
              return expect(Project.update({userId: oAuthUser.id, projectId: project.id, options: {ownerId: oAuthUser.id}})).to.be.rejectedWith('Only the project owner can set another user as the owner');
            });
        });
    });
    it('Should succeed when giving up ownership of a project that you own to someone else', () => {
      return Project.create({
        ownerId: localUser.id,
        name: 'test project'
      })
        .then((project) => {
          return Project.addContributor({ownerId: localUser.id, contributorId: oAuthUser.id, projectId: project.id})
            .then(() => {
              return Project.update({userId: localUser.id, projectId: project.id, options: {ownerId: oAuthUser.id}});
            });
        })
        .then((project) => {
          expect(project.ownerId).to.equal(oAuthUser.id);
        });
    });
  });

  describe('delete()', () => {
    it('Should delete existing project as the owner', () => {
      return Project.create({
        ownerId: localUser.id,
        name: 'test project'
      })
        .then((project) => {
          return expect(Project.delete(localUser.id, project.id)).to.eventually.equal(true);
        });
    });
    it('Should reject when trying to delete a project that you are not the owner of', () => {
      return Project.create({
        ownerId: localUser.id,
        name: 'test project'
      })
        .then((project) => {
          return expect(Project.delete(oAuthUser.id, project.id)).to.be.rejectedWith('Cannot delete a project that you do not own');
        });
    });
    it('Should reject when trying to delete a project that does not exist', () => {
      return expect(Project.delete(localUser.id, 1234)).to.be.rejectedWith('Project does not exist');
    });
  });

  describe('getById()', () => {
    it('Should return project if it exists', () => {
      return Project.create({
        ownerId: localUser.id,
        name: 'test project'
      })
        .then((project) => {
          return Project.getById(project.id)
            .then((project) => {
              expect(project).to.eql(project);
            });
        });
    });
    it('Should reject if project does not exist', () => {
      return expect(Project.getById(1234)).to.be.rejectedWith('Project does not exist');
    });
  });

  describe('getByName()', () => {
    it('Should return all projects with the given name', () => {
      return Project.create({
        ownerId: localUser.id,
        name: 'test project'
      })
        .then((project) => {
          return Project.create({
            ownerId: localUser.id,
            name: 'test project'
          })
            .then((project2) => {
              return Project.getByName('test project')
                .then((projects) => {
                  expect(projects.length).to.equal(2);
                  expect(projects[0].name).to.equal('test project');
                  expect(projects[1].name).to.equal('test project');
                  expect(projects[0].id).to.equal(project.id);
                  expect(projects[1].id).to.equal(project2.id);
                });
            });
        });
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
      return expect(Project.getContributors(1234)).to.be.rejectedWith('Project does not exist');
    });
  });

  // TODO - Move comment and like tests to their own models
  describe('Comment', () => {
    let project;
    beforeEach(() => {
      return Project.create({
        ownerId: localUser.id,
        name: 'test project'
      })
        .then((newProject) => {
          project = newProject;
        });
    });
    describe('create()', () => {
      it('Should create a comment on a project', () => {
        return Project.Comment.create({userId: localUser.id, projectId: project.id, text: 'this is a comment'})
          .then((comment) => {
            expect(comment.text).to.equal('this is a comment');
          });
      });
    });
    describe('edit()', () => {
      it('Should edit a comment on a project', () => {
        return Project.Comment.create({userId: localUser.id, projectId: project.id, text: 'this is a comment'})
          .then((comment) => {
            return Project.Comment.edit({userId: localUser.id, commentId: comment.id, text: 'updated text'});
          })
          .then((comment) => {
            expect(comment.text).to.equal('updated text');
          });
      });
    });
    describe('delete()', () => {
      it('Should delete a comment on a project', () => {
        return Project.Comment.create({userId: localUser.id, projectId: project.id, text: 'this is a comment'})
          .then((comment) => {
            return Project.Comment.delete({userId: localUser.id, commentId: comment.id});
          })
          .then((response) => {
            expect(response).to.equal(true);
          });
      });
    });
    describe('get()', () => {
      it('Should return comments for a project', () => {
        return Project.Comment.create({userId: localUser.id, projectId: project.id, text: 'this is a comment'})
          .then(() => {
            return Project.Comment.get(project.id);
          })
          .then((comments) => {
            expect(comments.length).to.equal(1);
            expect(comments[0].text).to.equal('this is a comment');
          });
      });
    });
  });

  describe('Like', () => {
    let project;
    beforeEach(() => {
      return Project.create({
        ownerId: localUser.id,
        name: 'test project'
      })
        .then((newProject) => {
          project = newProject;
        });
    });
    describe('create()', () => {
      it('Should create a like on a project', () => {
        return Project.Like.create({userId: localUser.id, projectId: project.id})
          .then((like) => {
            expect(like).to.exist;
          });
      });
    });
    describe('delete()', () => {
      it('Should delete a like on a project', () => {
        return Project.Like.create({userId: localUser.id, projectId: project.id})
          .then((like) => {
            return Project.Like.delete({userId: localUser.id, projectId: project.id});
          })
          .then((response) => {
            expect(response).to.equal(true);
          });
      });
    });
    describe('get()', () => {
      it('Should return likes for a project', () => {
        return Project.Like.create({userId: localUser.id, projectId: project.id})
          .then(() => {
            return Project.Like.get(project.id);
          })
          .then((likes) => {
            expect(likes.length).to.equal(1);
          });
      });
    });
  });
});