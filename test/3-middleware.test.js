import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';

import app from '../server';

const should = chai.should();

chai.use(chaiHttp);

const fakeToken = 'thisisafaketokenyoudig';
const invalidSignedToken = jwt.sign(
  {
    userId: 1,
    username: 'adminUser',
    firstName: 'admin',
    lastName: 'User',
    role: 'admin',
  }, 'fakeSecretcodefam');
const expiredToken = jwt.sign({
  userId: 1,
  username: 'adminUser',
  firstName: 'admin',
  lastName: 'User',
  role: 'Admin',
  iat: Math.floor(Date.now() / 1000) - 172800, // generated 2 days ago
  exp: Math.floor(Date.now() / 1000) - 86400, // expired 1 day ago
}, app.settings.JsonSecret);
const nonAdminToken = jwt.sign({
  userId: 1,
  username: 'adminUser',
  firstName: 'admin',
  lastName: 'User',
  role: 'User',
}, app.settings.JsonSecret);
const noRoleToken = jwt.sign({
  userId: 1,
  username: 'adminUser',
  firstName: 'admin',
  lastName: 'User'
}, app.settings.JsonSecret);

describe('Basic API Test', () => {
  it('should return 202 welcome', (done) => {
    chai.request(app)
      .get('/')
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.equal(202);
        response.type.should.equal('application/json');
        response.body.message.should.eql('Welcome to Hello-Books');
        done();
      });
  });
});
// simulate authors route to authorisation middleware
describe('Middleware Test', () => {
  describe('When no token is provided', () => {
    it('should return 401 Unsuccessful when no token is provided', (done) => {
      chai.request(app)
        .post('/api/v1/authors')
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(401);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Unsuccessful');
          res.body.message.should.eql('Unauthenticated');
          res.body.error.should.eql('Token not found');
          done();
        });
    });
  });
  describe('When an invalid token is provided', () => {
    it('should return 401 Unsuccessful when wrongly signed token is provided', (done) => {
      chai.request(app)
        .post('/api/v1/authors')
        .set('x-access-token', invalidSignedToken)
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(401);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Unsuccessful');
          res.body.message.should.eql('Unauthenticated');
          res.body.error.should.eql('JsonWebTokenError');
          done();
        });
    });
    it('should return 401 Unsuccessful when Fake but signed token is provided', (done) => {
      chai.request(app)
        .post('/api/v1/authors')
        .set('x-access-token', fakeToken) // set header 'x-access-token'
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(401);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Unsuccessful');
          res.body.message.should.eql('Unauthenticated');
          res.body.error.should.eql('JsonWebTokenError');
          done();
        });
    });
    it('should return 401 Unsuccessful when Expired token is provided',
      (done) => {
        chai.request(app)
          .post('/api/v1/authors')
          .set('x-access-token', expiredToken)
          .end((err, res) => {
            should.exist(err);
            res.status.should.equal(401);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('Unauthenticated');
            res.body.error.should.eql('TokenExpiredError');
            res.body.errortype.should.eql('jwt expired');
            done();
          });
      });
  });
  describe('When a valid token is provided', () => {
    describe('When user is not an admin', () => {
      it('should return 401 Not Allowed', (done) => {
        chai.request(app)
          .post('/api/v1/authors')
          .set('x-access-token', nonAdminToken)
          .end((err, res) => {
            should.exist(err);
            res.status.should.equal(401);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('Not allowed');
            done();
          });
      });
    });
    describe('When token has no role in it', () => {
      it('should return 401 invalid token', (done) => {
        chai.request(app)
          .post('/api/v1/authors')
          .set('x-access-token', noRoleToken)
          .end((err, res) => {
            should.exist(err);
            res.status.should.equal(401);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('Unathenticated');
            res.body.error.should.eql('InvalidToken');
            done();
          });
      });
    });
  });
});
