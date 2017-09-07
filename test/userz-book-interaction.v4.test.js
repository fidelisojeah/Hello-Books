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
const goodTokenInvalidUser = jwt.sign({
  userId: 40,
  username: 'adminUser',
  firstName: 'admin',
  lastName: 'User',
  role: 'Admin',
}, app.settings.JsonSecret);
const todayDate = new Date();
const due = todayDate.setMonth(todayDate.getMonth() + 1);

describe('POST /api/v4/users/:userId/books version 4', () => {
  describe('When incomplete Information is provided', () => {
    it('should return 404 invalid Book Id', (done) => {
      chai.request(app)
        .post('/api/v4/users/1/books')
        .set('x-access-token', goodToken)
        .send({
          duedate: due,
        })
        .end((err, res) => {
          should.exist(err);// or not
          res.status.should.equal(404);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Unsuccessful');
          res.body.message.should.eql('Invalid Book id');
          done();
        });
    });
    it('should return 404 invalid User Id', (done) => {
      chai.request(app)
        .post('/api/v4/users/q/books')
        .set('x-access-token', goodToken)
        .send({
          bookId: 1,
          duedate: due,
        })
        .end((err, res) => {
          should.exist(err);// or not
          res.status.should.equal(404);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Unsuccessful');
          res.body.message.should.eql('Invalid User id');
          done();
        });
    });
  });
  describe('When Complete Information is provided', () => {
    it('should return 401 when wrong user tries to borrow books', (done) => {
      chai.request(app)
        .post('/api/v4/users/3/books')// doesn't match token
        .set('x-access-token', goodToken)
        .send({
          bookId: 1,
          duedate: due,
        })
        .end((err, res) => {
          should.exist(err);// or not
          res.status.should.equal(401);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Unsuccessful');
          res.body.message.should.eql('Not Allowed');
          done();
        });
    });
    it('should return 401 when invalid user tries to borrow books', (done) => {
      chai.request(app)
        .post('/api/v4/users/40/books')// doesn't match token
        .set('x-access-token', goodTokenInvalidUser)
        .send({
          bookId: 1,
          duedate: due,
        })
        .end((err, res) => {
          should.exist(err);// or not
          res.status.should.equal(401);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Unsuccessful');
          res.body.message.should.eql('Not Allowed');
          done();
        });
    });
    it('should return 400 when No such book exists', (done) => {
      chai.request(app)
        .post('/api/v4/users/1/books')// doesn't match token
        .set('x-access-token', goodToken)
        .send({
          bookId: 199,
          duedate: due,
        })
        .end((err, res) => {
          should.exist(err);// or not
          res.status.should.equal(400);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Unsuccessful');
          res.body.message.should.eql('Invalid Book');
          done();
        });
    });
    it('should return 202 Successfully Borrowed', (done) => {
      chai.request(app)
        .post('/api/v4/users/1/books')
        .set('x-access-token', goodToken)
        .send({
          bookId: 2,
          duedate: due,
        })
        .end((err, res) => {
          should.not.exist(err);// or not
          res.status.should.equal(202);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Success');
          res.body.message.should.eql('Book Successfully Borrowed');
          done();
        });
    });
    describe('When Book is not available', () => {
      it('should return 200 Book Unavailable', (done) => {
        chai.request(app)
          .post('/api/v4/users/1/books')
          .set('x-access-token', goodToken)
          .send({
            bookId: 2,
            duedate: due,
          })
          .end((err, res) => {
            should.not.exist(err);// or not
            res.status.should.equal(200);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('Book Unavailable');
            done();
          });
      });
    });
  });
});
// .set('x-access-token', goodToken)

