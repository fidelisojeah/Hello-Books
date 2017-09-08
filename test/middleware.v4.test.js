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

// simulate authors route to authorisation middleware
describe('Middleware Test', () => {
  describe('When no token is provided', () => {
    it('should return 401 Unsuccessful when no token is provided', (done) => {
      chai.request(app)
        .post('/api/v4/authors')
        .end((err, res) => {
          should.exist(err);// or not
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
        .post('/api/v4/authors')
        .set('x-access-token', invalidSignedToken)
        .end((err, res) => {
          should.exist(err);// or not
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
        .post('/api/v4/authors')
        .set('x-access-token', fakeToken) // set header 'x-access-token'
        .end((err, res) => {
          should.exist(err);// or not
          res.status.should.equal(401);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Unsuccessful');
          res.body.message.should.eql('Unauthenticated');
          res.body.error.should.eql('JsonWebTokenError');
          done();
        });
    });
    it('should return 401 Unsuccessful when Expired token is provided', (done) => {
      chai.request(app)
        .post('/api/v4/authors')
        .set('x-access-token', expiredToken)
        .end((err, res) => {
          should.exist(err);// or not
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
      it('should return 400 Info', (done) => {
        chai.request(app)
          .post('/api/v4/authors')
          .set('x-access-token', nonAdminToken)
          .end((err, res) => {
            should.exist(err);// or not
            res.status.should.equal(401);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('Not allowed');
            done();
          });
      });
    });
  });
});
