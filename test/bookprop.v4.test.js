import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';

import app from '../server';

const should = chai.should();

chai.use(chaiHttp);
const goodToken = jwt.sign({
  userId: 1,
  username: 'adminUser',
  firstName: 'admin',
  lastName: 'User',
  role: 'Admin',
}, app.settings.JsonSecret);

describe('POST /api/v4/authors version 4', () => {
  before((done) => {
    chai.request(app).get('/api/v4/users/logout').end(done);
  });
  describe('When Valid token is provided', () => {
    describe('When incomplete information is provided', () => {
      it('should return 400 for no author firstname provided', (done) => {
        chai.request(app)
          .post('/api/v4/authors')
          .set('x-access-token', goodToken)
          .send({
            firstname: 'Joanne',
            authorDOB: '1965-07-31',
          })
          .end((err, res) => {
            should.exist(err);// or not
            res.status.should.equal(400);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('Incomplete details');
            done();
          });
      });
      it('should return 400 for no author firstname provided', (done) => {
        chai.request(app)
          .post('/api/v4/authors')
          .set('x-access-token', goodToken)
          .send({
            lastname: 'Rowling',
            authorDOB: '1965-07-31',
          })
          .end((err, res) => {
            should.exist(err);// or not
            res.status.should.equal(400);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('Incomplete details');
            done();
          });
      });
    });
    describe('When complete information is supplied', () => {
      it('should return 201 success', (done) => {
        chai.request(app)
          .post('/api/v4/authors')
          .set('x-access-token', goodToken)
          .send({
            firstname: 'Joanne',
            lastname: 'Rowling',
            authorAKA: 'J.K Rowling',
            authorDOB: '1965-07-31',
          })
          .end((err, res) => {
            should.not.exist(err);// or not
            res.status.should.equal(201);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Success');
            res.body.message.should.eql('Author Created Successfully');
            done();
          });
      });
    });
  });
});
