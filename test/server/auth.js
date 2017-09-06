const chai = require('chai').use(require('chai-as-promised')).use(require('chai-http'));
const expect = chai.expect;
const app = require('../../server/app').listen(8080);
const request = chai.request(app);
const db = require('../../db');

describe('/signup', () => {
  beforeEach(() => {
    return db.connection.clear();
  });
  it('Should be able to create new local users', (done) => {
    let agent = chai.request.agent(app);
    agent.post('/signup')
      .send({username: 'test', password: 'test'})
      .end((err, res) => {
        expect(err).to.not.exist;
        expect(res).to.have.cookie;
        done();
      });
  });
  it('Should return error when attempting to create a user using an email that is already taken', (done) => {
    let tempAgentOne = chai.request.agent(app);
    let tempAgentTwo = chai.request.agent(app);
    tempAgentOne.post('/signup')
      .send({username: 'test', password: 'test'})
      .end(res => null)
      .then(() => {
        return tempAgentTwo.post('/signup')
          .send({username: 'test', password: 'test'})
          .end((err, res) => {
            expect(err).to.exist;
            done();
          })
          // TODO - Find a way to make this test less janky
          .catch(() => {
            done();
          });
      });
  });
});