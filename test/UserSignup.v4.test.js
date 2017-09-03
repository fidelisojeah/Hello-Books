import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server';

const should = chai.should();

chai.use(chaiHttp);
let token1;
let token2;
const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZpZGVsaXNvamVhaCIsInVzZXJJZCI6MSwiZW1haWwiOiJmaWRlbGlzQG9qZWFoLmNvbS5uZyIsImF1dGhTdHJpbmciOiJiOTIxZjZmZjYxZWY5ZTYzZTRlMzhkZmNlZGNkNzllYmRjMTZhNjZhZmVmMTY5ZTkiLCJpYXQiOjE1MDQzNjI2ODMsImV4cCI6MTUwNDQ0OTA4M30.W2UUu6MKs8h8Wwr-EdXlkpcxszdSDhqWsPgYujKy_Mo';
const invalidUserToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNvbWVib2R5ZWxzZSIsInVzZXJJZCI6MzAwLCJlbWFpbCI6ImZpZGVsaXNAb2plYWguY29tLm5nIiwiYXV0aFN0cmluZyI6ImI5MjFmNmZmNjFlZjllNjNlNGUzOGRmY2VkY2Q3OWViZGMxNmE2NmFmZWYxNjllOSIsImlhdCI6MTUwNDM2MjY4MywiZXhwIjoyNTA0NDU5MDgzfQ.t03oANHnxQLjCtfL5EFBPi4ToZKQWCvDkRXLLqHhkZM';
const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZpZGVsaXNvamFoIiwidXNlcklkIjoxLCJlbWFpbCI6ImZpZGVsaXNAb2plYWguY29tLm5nIiwiYXV0aFN0cmluZyI6ImI5MjFmNmZmNjFlZjllNjNlNGUzOGRmY2VkY2Q3OWViZGMxNmE2NmFmZWYxNjllOSIsImlhdCI6MTUwNDM2MjY4MywiZXhwIjoyNTA0NDU5MDgzfQ.CmO_3wq2w5oyCboU9U6qSPm4cNF8ktn5Y1eMwZqrT2I';
const badSignatureToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZpZGVsaXNvamVhaCIsInVzZXJJZCI6MSwiZW1haWwiOiJmaWRlbGlzQG9qZWFoLmNvbS5uZyIsImF1dGhTdHJpbmciOiJiOTIxZjZmZjYxZWY5ZTYzZTRlMzhkZmNlZGNkNzllYmRjMTZhNjZhZmVmMTY5ZTIiLCJpYXQiOjE1MDQzNjI2ODMsImV4cCI6MTUwNDQ1OTA4M30.L8npyhKjsegFwNFrWlSsDqQNg1radirfjXyGiwNY2cw';

describe('POST /api/v4/users/signup Version 4', () => {
  before((done) => {
    chai.request(app).delete('/api/users').end(done);
  });
  describe('When Users attempt to signup', () => {
    describe('When there is an issue with information provided', () => {
      it('Should respond with code 400 Invalid Username for blank username', (done) => {
        chai.request(app)
          .post('/api/v4/users/signup')
          .send({
            password: 'TestUser123$',
            firstname: 'Test',
            lastname: 'User',
            email: 'test@user.com.ng',
          })
          .end((err, res) => {
            should.exist(err);
            res.status.should.equal(400);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('Username Invalid');
            done();
          });
      });
      it('Should respond with code 400 Username too short for Short username', (done) => {
        chai.request(app)
          .post('/api/v4/users/signup')
          .send({
            password: 'TestUser123$',
            firstname: 'Test',
            username: 't',
            lastname: 'User',
            email: 'test@user.com.ng',
          })
          .end((err, res) => {
            should.exist(err);
            res.status.should.equal(400);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('Username too short');
            done();
          });
      });
      it('Should respond with code 400 Invalid First Name for blank firstname', (done) => {
        chai.request(app)
          .post('/api/v4/users/signup')
          .send({
            password: 'TestUser123$',
            username: 'Test',
            lastname: 'User',
            email: 'test@user.com.ng',
          })
          .end((err, res) => {
            should.exist(err);
            res.status.should.equal(400);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('First Name Invalid');
            done();
          });
      });
      it('Should respond with code 400 First Name too short for short firstname', (done) => {
        chai.request(app)
          .post('/api/v4/users/signup')
          .send({
            password: 'TestUser123$',
            firstname: 't',
            username: 'Test',
            lastname: 'User',
            email: 'test@user.com.ng',
          })
          .end((err, res) => {
            should.exist(err);
            res.status.should.equal(400);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('First Name too short');
            done();
          });
      });
      it('Should respond with code 400 Invalid Last Name for blank lastname', (done) => {
        chai.request(app)
          .post('/api/v4/users/signup')
          .send({
            password: 'TestUser123$',
            username: 'Test',
            firstname: 'User',
            email: 'test@user.com.ng',
          })
          .end((err, res) => {
            should.exist(err);
            res.status.should.equal(400);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('Last Name Invalid');
            done();
          });
      });
      it('Should respond with code 400 Last Name too short for short lastname', (done) => {
        chai.request(app)
          .post('/api/v4/users/signup')
          .send({
            password: 'TestUser123$',
            lastname: 't',
            username: 'Test',
            firstname: 'User',
            email: 'test@user.com.ng',
          })
          .end((err, res) => {
            should.exist(err);
            res.status.should.equal(400);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('Last Name too short');
            done();
          });
      });
      it('Should respond with code 400 Password Invalid for blank password', (done) => {
        chai.request(app)
          .post('/api/v4/users/signup')
          .send({
            firstname: 'Test',
            username: 'Testuser',
            lastname: 'User',
            email: 'test@user.com.ng',
          })
          .end((err, res) => {
            should.exist(err);
            res.status.should.equal(400);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('Password Invalid');
            done();
          });
      });
      it('Should respond with code 400 Password too short for short Password', (done) => {
        chai.request(app)
          .post('/api/v4/users/signup')
          .send({
            password: 'Ts',
            firstname: 'Test',
            username: 'Test',
            lastname: 'User',
            email: 'test@user.com.ng',
          })
          .end((err, res) => {
            should.exist(err);
            res.status.should.equal(400);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('Password too short');
            done();
          });
      });
      it('Should respond with code 400 Email Address Invalid for blank email', (done) => {
        chai.request(app)
          .post('/api/v4/users/signup')
          .send({
            password: 'TestUser123$',
            firstname: 'Test',
            username: 'Testuser',
            lastname: 'User',
          })
          .end((err, res) => {
            should.exist(err);
            res.status.should.equal(400);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('No email Provided');
            done();
          });
      });
      it('Should respond with code 400 Email Invalid for Wrong email addres', (done) => {
        chai.request(app)
          .post('/api/v4/users/signup')
          .send({
            password: 'TestUser123$',
            firstname: 'Test',
            username: 'Testuser',
            lastname: 'User',
            email: 'testuser.com.ng',
          })
          .end((err, res) => {
            should.exist(err);
            res.status.should.equal(400);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('Email Address invalid');
            done();
          });
      });
    });
    describe('When the Information provided is correct', () => {
      describe('When the Information provided is unique', () => {
        it('Should respond with code 201 User Created', (done) => {
          chai.request(app)
            .post('/api/v4/users/signup')
            .send({
              password: 'TestUser123$',
              firstname: 'Test',
              username: 'Testuser',
              lastname: 'User',
              email: 'test@user.com.ng',
            })
            .end((err, res) => {
              should.not.exist(err);
              res.status.should.equal(201);
              res.type.should.equal('application/json');
              res.body.status.should.eql('Success');
              res.body.message.should.eql('User account created');
              res.body.membership.should.eql('Blue');
              token1 = res.body.token;
              done();
            });
        });
        it('Should respond with code 201 User Created', (done) => {
          chai.request(app)
            .post('/api/v4/users/signup')
            .send({
              password: 'SomebodyPassword123$',
              firstname: 'Somebody',
              username: 'SomebodyElse',
              lastname: 'Else',
              email: 'somebodyelse@user.com.ng',
            })
            .end((err, res) => {
              should.not.exist(err);
              res.status.should.equal(201);
              res.type.should.equal('application/json');
              res.body.status.should.eql('Success');
              res.body.message.should.eql('User account created');
              res.body.membership.should.eql('Blue');
              token2 = res.body.token;
              done();
            });
        });
      });
      describe('When Information provided is not unique', () => {
        it('Should respond with a 400 email must be unique', (done) => {
          chai.request(app)
            .post('/api/v4/users/signup')
            .send({
              password: 'SomebodyPassword123$',
              firstname: 'Somebody',
              username: 'newUsname',
              lastname: 'Else',
              email: 'somebodyelse@user.com.ng',
            })
            .end((err, res) => {
              should.exist(err);
              res.status.should.equal(400);
              res.type.should.equal('application/json');
              res.body.status.should.eql('Unsuccessful');
              res.body.message.should.eql('emailaddress must be unique');
              done();
            });
        });
        it('Should respond with a 400 username must be unique', (done) => {
          chai.request(app)
            .post('/api/v4/users/signup')
            .send({
              password: 'SomebodyPassword123$',
              firstname: 'Somebody',
              username: 'SomebodyElse',
              lastname: 'Else',
              email: 'newemailAddress@user.com.ng',
            })
            .end((err, res) => {
              should.exist(err);
              res.status.should.equal(400);
              res.type.should.equal('application/json');
              res.body.status.should.eql('Unsuccessful');
              res.body.message.should.eql('username must be unique');
              done();
            });
        });
      });
    });
  });
});
describe('GET /api/v4/users/verify', () => {
  describe('When an invalid token is used to verify email address', () => {
    it('Should return expired token error', (done) => {
      chai.request(app)
        .get('/api/v4/users/verify')
        .query({
          id: 'SomebodyElse',
          key: expiredToken,
        })
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(403);
          res.type.should.equal('application/json');
          res.body.name.should.eql('TokenExpiredError');
          res.body.message.should.eql('jwt expired');
          done();
        });
    });
    it('Should return Invalid User error', (done) => {
      chai.request(app)
        .get('/api/v4/users/verify')
        .query({
          id: 'SomebodyElse',
          key: invalidUserToken,
        })
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(403);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Unsuccessful');
          res.body.message.should.eql('Invalid User');
          done();
        });
    });
    it('Should return Invalid Token error', (done) => {
      chai.request(app)
        .get('/api/v4/users/verify')
        .query({
          id: 'SomebodyElse',
          key: invalidToken,
        })
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(403);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Unsuccessful');
          res.body.message.should.eql('Invalid Token');
          done();
        });
    });
    it('Should return Invalid Token Signature error', (done) => {
      chai.request(app)
        .get('/api/v4/users/verify')
        .query({
          id: 'SomebodyElse',
          key: badSignatureToken,
        })
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(403);
          res.type.should.equal('application/json');
          res.body.name.should.eql('JsonWebTokenError');
          res.body.message.should.eql('invalid signature');
          done();
        });
    });
    it('Should return Link invalid error when key not supplied', (done) => {
      chai.request(app)
        .get('/api/v4/users/verify')
        .query({
          id: 'SomebodyElse',
        })
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(400);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Unsuccessful');
          res.body.message.should.eql('Link Invalid');
          done();
        });
    });
    it('Should return Link invalid error when id not supplied', (done) => {
      chai.request(app)
        .get('/api/v4/users/verify')
        .query({
          key: token2,
        })
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(400);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Unsuccessful');
          res.body.message.should.eql('Link Invalid');
          done();
        });
    });
    it('Should return token malformed when fake token is supplied', (done) => {
      chai.request(app)
        .get('/api/v4/users/verify')
        .query({
          id: 'SomebodyElse',
          key: 'trashtokenwithoutsignature',
        })
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(403);
          res.type.should.equal('application/json');
          res.body.name.should.eql('JsonWebTokenError');
          res.body.message.should.eql('jwt malformed');
          done();
        });
    });
  });
  describe('When a valid token is provided', () => {
    it('Should return Success User Activated when all is valid', (done) => {
      chai.request(app)
        .get('/api/v4/users/verify')
        .query({
          id: 'SomebodyElse',
          key: token2,
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(202);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Success');
          res.body.message.should.eql('User Activated');
          done();
        });
    });
    it('Should return Success User Activated when all is valid', (done) => {
      chai.request(app)
        .get('/api/v4/users/verify')
        .query({
          id: 'Testuser',
          key: token1,
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(202);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Success');
          res.body.message.should.eql('User Activated');
          done();
        });
    });
    it('Should return User already Activated when User has been activated before', (done) => {
      chai.request(app)
        .get('/api/v4/users/verify')
        .query({
          id: 'Testuser',
          key: token1,
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('None');
          res.body.message.should.eql('User already activated');
          done();
        });
    });
  });
});
