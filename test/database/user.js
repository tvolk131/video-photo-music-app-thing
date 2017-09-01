const { connection, User } = require('../../db');
const expect = require('chai').use(require('chai-as-promised')).expect;

describe('User Model', () => {
  beforeEach(() => {
    return connection.reset();
  });

  describe('create()', () => {
    it('Should create local auth user with all valid parameters', () => {
      return User.create({
        username: 'test',
        password: 'test'
      })
        .then((user) => {
          expect(user).to.exist;
        });
    });
    it('Should create oAuth user with all valid parameters', () => {
      return User.create({
        oAuthUserId: 1,
        oAuthProvider: 'google'
      })
        .then((user) => {
          expect(user).to.exist;
        });
    });
    it('Should reject when creating a local auth user with an email field that is not an email', () => {
      return expect(User.create({
        oAuthUserId: 1,
        oAuthProvider: 'google',
        email: 'not an email'
      })).to.be.rejectedWith('Validation error: Validation isEmail on email failed');
    });
    it('Should reject when creating user with no oAuth or local auth credentials', () => {
      return expect(User.create({})).to.be.rejectedWith('Cannot create account without neither oAuth nor local auth credentials');
    });
    it('Should reject when creating user with oAuth and local auth credentials', () => {
      return expect(User.create({oAuthUserId: 1, oAuthProvider: 'google', username: 'test'})).to.be.rejectedWith('Cannot create oAuth account with local username');
    });
    it('Should reject when creating user local auth credentials and an oAuth ID', () => {
      return expect(User.create({oAuthUserId: 1, username: 'test', email: 'foo@gmail.com', password: 'test'})).to.be.rejectedWith('Cannot create local auth account with oAuth ID');
    });
    it('Should reject when creating user local auth credentials and an oAuth provider', () => {
      return expect(User.create({oAuthProvider: 'google', username: 'test', email: 'foo@gmail.com', password: 'test'})).to.be.rejectedWith('Cannot create local auth account with oAuth provider');
    });
    it('Should reject when creating user with an email that is already registered', () => {
      return User.create({username: 'test', email: 'foo@gmail.com', password: 'test'})
        .then(() => {
          return expect(User.create({username: 'test', email: 'foo@gmail.com', password: 'test'})).to.be.rejected;
        });
    });
    it('Should reject when creating user with a handle that is already registered', () => {
      return User.create({username: 'test', email: 'foo@gmail.com', password: 'test', handle: 'Macho Man Randy Savage'})
        .then(() => {
          return expect(User.create({username: 'test', email: 'bar@gmail.com', password: 'test', handle: 'Macho Man Randy Savage'})).to.be.rejected;
        });
    });
  });

  describe('update()', () => {
    let localUser = {
      username: 'test',
      password: 'test'
    };
    let oAuthUser = {
      oAuthUserId: 1234,
      oAuthProvider: 'facebook'
    };

    beforeEach(() => {
      return User.create(localUser)
        .then((newUser) => {
          localUser = newUser;
          return User.create(oAuthUser);
        })
        .then((newUser) => {
          oAuthUser = newUser;
        });
    });

    it('Should update local user and return the updated version when query is valid', () => {
      return User.update(localUser.id, {handle: 'freddyz'})
        .then((user) => {
          expect(user.handle).to.equal('freddyz');
        });
    });
    it('Should update oAuth user and return the updated version when query is valid', () => {
      return User.update(oAuthUser.id, {handle: 'freddyz'})
        .then((user) => {
          expect(user.handle).to.equal('freddyz');
        });
    });
    it('Should not allow changing of oAuthUserId and oAuthProvider fields if attempting to change local user', () => {
      return expect(User.update(localUser.id, {oAuthUserId: 1234})).to.be.rejectedWith('Cannot modify oAuth data');
    });
    it('Should not allow changing of username and password fields if attempting to change oAuth user', () => {
      return expect(User.update(oAuthUser.id, {username: 'foo'})).to.be.rejectedWith('Cannot update username or password fields when signed in through oAuth provider');
    });
    it('Should reject when no update query is specified', () => {
      return expect(User.update(localUser.id)).to.rejectedWith('No update query was specified');
    });
    it('Should reject when attempting to change oAuthUserId', () => {
      return expect(User.update(localUser.id, {oAuthUserId: 1234})).to.rejectedWith('Cannot modify oAuth data');
    });
    it('Should reject when attempting to change oAuthProvider', () => {
      return expect(User.update(localUser.id, {oAuthProvider: 1234})).to.rejectedWith('Cannot modify oAuth data');
    });
  });
});