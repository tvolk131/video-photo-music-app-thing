const chai = require('chai').use(require('chai-as-promised')).use(require('chai-http'));
const expect = chai.expect;
const app = require('../../server/app').listen(8080);
const request = chai.request(app);
const db = require('../../db');

describe('/graphql user', () => {
  beforeEach(() => {
    return db.connection.clear()
      .then(() => {
        return db.User.create({handle: 'testHandle', email: 'foo@bar.com', username: 'foo', password: 'bar'});
      });
  });
  it('Should return an error when retrieving a user by an ID that does not exist', (done) => {
    request.post('/graphql?')
    .send({query: '{user(id: 2){id}}'})
    .end((err, res) => {
      expect(err).to.not.exist;
      expect(res).to.have.status(200);
      expect(res.body.errors).to.exist;
      expect(res.body.data.user).to.equal(null);
      done();
    });
  });
  it('Should find users by ID if they exist', (done) => {
    request.post('/graphql?')
      .send({query: '{user(id: 1){id username}}'})
      .end((err, res) => {
        expect(err).to.not.exist;
        expect(res).to.have.status(200);
        expect(res.body.errors).to.not.exist;
        expect(res.body.data.user).to.eql({id: 1, username: 'foo'});
        done();
      });
  });
  it('Should find users by handle if they exist', (done) => {
    request.post('/graphql?')
      .send({query: '{user(handle: "testHandle"){id username}}'})
      .end((err, res) => {
        expect(err).to.not.exist;
        expect(res).to.have.status(200);
        expect(res.body.errors).to.not.exist;
        expect(res.body.data.user).to.eql({id: 1, username: 'foo'});
        done();
      });
  });
  it('Should find users by email if they exist', (done) => {
    request.post('/graphql?')
      .send({query: '{user(email: "foo@bar.com"){id username}}'})
      .end((err, res) => {
        expect(err).to.not.exist;
        expect(res).to.have.status(200);
        expect(res.body.errors).to.not.exist;
        expect(res.body.data.user).to.eql({id: 1, username: 'foo'});
        done();
      });
  });
  it('Should find users by username if they exist', (done) => {
    request.post('/graphql?')
      .send({query: '{user(username: "foo"){id username}}'})
      .end((err, res) => {
        expect(err).to.not.exist;
        expect(res).to.have.status(200);
        expect(res.body.errors).to.not.exist;
        expect(res.body.data.user).to.eql({id: 1, username: 'foo'});
        done();
      });
  });
});