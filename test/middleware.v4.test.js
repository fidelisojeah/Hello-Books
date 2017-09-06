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
// simulate authors route to authorisation middleware
describe('POST /api/v4/authors version 4', () => {
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
        .set('x-access-token', fakeToken)
        .end((err, res) => {
          should.exist(err);// or not
          res.status.should.equal(401);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Unsuccessful');
          res.body.message.should.eql('Unauthenticated');
          res.body.error.should.eql('InvalidToken');
          done();
        });
    });
    it('should return 401 Unsuccessful when Expired token is provided', (done) => {
      chai.request(app)
        .post('/api/v4/authors')
        .set('x-access-token', fakeToken)
        .end((err, res) => {
          should.exist(err);// or not
          res.status.should.equal(401);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Unsuccessful');
          res.body.message.should.eql('Unauthenticated');
          res.body.error.should.eql('');
          done();
        });
    });
  });
});
