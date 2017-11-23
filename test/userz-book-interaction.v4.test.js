import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';

import db from '../server/models';
import app from '../server';

const should = chai.should();

chai.use(chaiHttp);
chai.use(require('chai-things'));

require('./UserDetails.v4.test');
require('./bookprop.v4.test');
require('./helpers.test');
require('./middleware.v4.test');

const goodToken = jwt.sign({
  userId: 1,
  username: 'adminUser',
  firstName: 'admin',
  lastName: 'User',
  role: 'Admin',
}, app.settings.JsonSecret);
const invalidUserIdToken = jwt.sign({
  userId: 'ab3c',
  username: 'normalUser',
  firstName: 'user',
  lastName: 'surname',
  role: 'User',
}, app.settings.JsonSecret);
const goodToken2 = jwt.sign({
  userId: 2,
  username: 'SomebodyElse',
  firstName: 'Somebody',
  lastName: 'Else',
  role: 'User',
}, app.settings.JsonSecret);
const goodTokenInvalidUser = jwt.sign({
  userId: 60,
  username: 'adminUser',
  firstName: 'admin',
  lastName: 'User',
  role: 'Admin',
}, app.settings.JsonSecret);
const todayDate = new Date();
const due = todayDate.setMonth(todayDate.getMonth() + 1);

let lndId;
describe('User Book Interaction tests', () => {
  after((done) => {
    db.sequelize.getQueryInterface().dropAllTables()
      .then(() => {
        db.sequelize.sync({ force: true, logging: console.log });
        done();
      });
  });
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
            should.exist(err);
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
            should.exist(err);
            res.status.should.equal(404);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('Invalid User id');
            done();
          });
      });
      it('should return 400 Invalid Due Date when no duedate is sent', (done) => {
        chai.request(app)
          .post('/api/v4/users/1/books')
          .set('x-access-token', goodToken)
          .send({
            bookId: 1
          })
          .end((err, res) => {
            should.exist(err);
            res.status.should.equal(400);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('Invalid Due date');
            done();
          });
      });
    });
    describe('When Complete Information is provided', () => {
      describe('When invalid info is sent', () => {
        it('should return 400 Invalid Due Date', (done) => {
          chai.request(app)
            .post('/api/v4/users/1/books')
            .set('x-access-token', goodToken)
            .send({
              bookId: 1,
              duedate: 'rubbishDateFam',
            })
            .end((err, res) => {
              should.exist(err);
              res.status.should.equal(400);
              res.type.should.equal('application/json');
              res.body.status.should.eql('Unsuccessful');
              res.body.message.should.eql('Invalid Due date');
              done();
            });
        });
      });
      it('should return 401 when wrong user tries to borrow books', (done) => {
        chai.request(app)
          .post('/api/v4/users/3/books')// doesn't match token
          .set('x-access-token', goodToken)
          .send({
            bookId: 1,
            duedate: due,
          })
          .end((err, res) => {
            should.exist(err);
            res.status.should.equal(401);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('Not Allowed');
            done();
          });
      });
      it('should return 401 when invalid user tries to borrow books',
        (done) => {
          chai.request(app)
            .post('/api/v4/users/40/books')// doesn't match token
            .set('x-access-token', goodTokenInvalidUser)
            .send({
              bookId: 1,
              duedate: due,
            })
            .end((err, res) => {
              should.exist(err);
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
            should.exist(err);
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
            should.not.exist(err);
            res.status.should.equal(202);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Success');
            res.body.message.should.eql('Book Successfully Borrowed');
            done();
          });
      });
      it('should return 202 Successfully Borrowed', (done) => {
        chai.request(app)
          .post('/api/v4/users/1/books')
          .set('x-access-token', goodToken)
          .send({
            bookId: 1,
            duedate: due,
          })
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.equal(202);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Success');
            res.body.message.should.eql('Book Successfully Borrowed');
            lndId = res.body.lendId;
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
              should.not.exist(err);
              res.status.should.equal(200);
              res.type.should.equal('application/json');
              res.body.status.should.eql('Unsuccessful');
              res.body.message.should.eql('Book Unavailable');
              done();
            });
        });
      });

      describe('When User has borrowed max number of books', () => {
        before((done) => {
          chai.request(app)
            .post('/api/v4/users/1/books')
            .set('x-access-token', goodToken)
            .send({
              bookId: 3,
              duedate: due,
            })
            .end((err, res) => {
              should.not.exist(err);
              res.status.should.equal(202);
              res.type.should.equal('application/json');
              res.body.status.should.eql('Success');
              res.body.message.should.eql('Book Successfully Borrowed');
              done();
            });
        });
        it('should return 200 Max Limit Reached', (done) => {
          chai.request(app)
            .post('/api/v4/users/1/books')
            .set('x-access-token', goodToken)
            .send({
              bookId: 4,
              duedate: due,
            })
            .end((err, res) => {
              should.not.exist(err);
              res.status.should.equal(200);
              res.type.should.equal('application/json');
              res.body.status.should.eql('Unsuccessful');
              res.body.message.should.eql('Max borrow limit reached');
              done();
            });
        });
      });
    });
  });
  describe('GET /api/v4/users/:userId/books version 4', () => {
    describe('When incomplete Information is provided', () => {
      it('should return 404 invalid User Id', (done) => {
        chai.request(app)
          .get('/api/v4/users/q/books')
          .set('x-access-token', goodToken)
          .end((err, res) => {
            should.exist(err);
            res.status.should.equal(404);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('Invalid User id');
            done();
          });
      });
    });
    describe('When Complete Information is provided', () => {
      it('should return 401 when wrong user tries to borrow books',
        (done) => {
          chai.request(app)
            .get('/api/v4/users/3/books')// doesn't match token
            .set('x-access-token', goodToken)
            .end((err, res) => {
              should.exist(err);
              res.status.should.equal(401);
              res.type.should.equal('application/json');
              res.body.status.should.eql('Unsuccessful');
              res.body.message.should.eql('Not Allowed');
              done();
            });
        });
      it('should return 401 when invalid user tries to view borrow books',
        (done) => {
          chai.request(app)
            .get('/api/v4/users/40/books')// doesn't match token
            .set('x-access-token', goodTokenInvalidUser)
            .end((err, res) => {
              should.exist(err);
              res.status.should.equal(401);
              res.type.should.equal('application/json');
              res.body.status.should.eql('Unsuccessful');
              res.body.message.should.eql('Not Allowed');
              done();
            });
        });
      it('should return 200 Unsuccessful when User hasn\'t borrowed any books',
        (done) => {
          chai.request(app)
            .get('/api/v4/users/2/books')// doesn't match token
            .set('x-access-token', goodToken2)
            .end((err, res) => {
              should.not.exist(err);
              res.status.should.equal(200);
              res.type.should.equal('application/json');
              res.body.status.should.eql('Unsuccessful');
              res.body.message.should.eql('No borrowed Books');
              done();
            });
        });
      it('should return 202 and book list', (done) => {
        chai.request(app)
          .get('/api/v4/users/1/books')
          .set('x-access-token', goodToken)
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.equal(202);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Success');
            done();
          });
      });
    });
  });
  describe('PUT /api/v4/users/:userId/books version 4', () => {
    describe('When incomplete Information is provided', () => {
      it('should return 404 invalid Book Id', (done) => {
        chai.request(app)
          .put('/api/v4/users/1/books')
          .set('x-access-token', goodToken)
          .send({
            lendId: 1,
          })
          .end((err, res) => {
            should.exist(err);
            res.status.should.equal(404);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('Invalid Book id');
            done();
          });
      });
      it('should return 404 invalid Book Id for invalid bookId', (done) => {
        chai.request(app)
          .put('/api/v4/users/1/books')
          .set('x-access-token', goodToken)
          .send({
            bookId: 'q3',
          })
          .end((err, res) => {
            should.exist(err);
            res.status.should.equal(404);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('Invalid Book id');
            done();
          });
      });
      it('should return 404 invalid User Id', (done) => {
        chai.request(app)
          .put('/api/v4/users/q/books')
          .set('x-access-token', goodToken)
          .send({
            bookId: 1,
          })
          .end((err, res) => {
            should.exist(err);
            res.status.should.equal(404);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('Invalid User id');
            done();
          });
      });
      it('should return 404 void lend Id', (done) => {
        chai.request(app)
          .put('/api/v4/users/1/books')
          .set('x-access-token', goodToken)
          .send({
            bookId: 1,
          })
          .end((err, res) => {
            should.exist(err);
            res.status.should.equal(404);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('Invalid');
            done();
          });
      });
      it('should return 404 invalid for invalid lend Id', (done) => {
        chai.request(app)
          .put('/api/v4/users/1/books')
          .set('x-access-token', goodToken)
          .send({
            bookId: 1,
            lendId: 'abvs',
          })
          .end((err, res) => {
            should.exist(err);
            res.status.should.equal(404);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('Invalid');
            done();
          });
      });
    });
    describe('When Complete Information is provided', () => {
      it('should return 401 when wrong user tries to return books', (done) => {
        chai.request(app)
          .put('/api/v4/users/3/books')// doesn't match token
          .set('x-access-token', goodToken)
          .send({
            bookId: 1,
            lendId: 1,
          })
          .end((err, res) => {
            should.exist(err);
            res.status.should.equal(401);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('Not Allowed');
            done();
          });
      });
      it('should return 401 when invalid user tries to return books',
        (done) => {
          chai.request(app)
            .put('/api/v4/users/40/books')// doesn't match token
            .set('x-access-token', goodTokenInvalidUser)
            .send({
              bookId: 1,
              lendId: 1,
            })
            .end((err, res) => {
              should.exist(err);
              res.status.should.equal(401);
              res.type.should.equal('application/json');
              res.body.status.should.eql('Unsuccessful');
              res.body.message.should.eql('Not Allowed');
              done();
            });
        });
      it('should return 404 when No record of borrowed book exists', (done) => {
        chai.request(app)
          .put('/api/v4/users/1/books')// doesn't match token
          .set('x-access-token', goodToken)
          .send({
            bookId: 1,
            lendId: 309,
          })
          .end((err, res) => {
            should.exist(err);
            res.status.should.equal(404);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('No records found');
            done();
          });
      });
      it('should return 401 when lendId does not match details', (done) => {
        chai.request(app)
          .put('/api/v4/users/1/books')// doesn't match token
          .set('x-access-token', goodToken)
          .send({
            bookId: 1,
            lendId: 1,
          })
          .end((err, res) => {
            should.exist(err);
            res.status.should.equal(401);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('User/Book not matching records');
            done();
          });
      });
      it('should return 202 Successfully Returned', (done) => {
        chai.request(app)
          .put('/api/v4/users/1/books')
          .set('x-access-token', goodToken)
          .send({
            bookId: 1,
            lendId: lndId,
          })
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.equal(202);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Success');
            should.exist(res.body.message);
            done();
          });
      });
      describe('When Book has been returned', () => {
        it('should return 200 Book Already Returned', (done) => {
          chai.request(app)
            .put('/api/v4/users/1/books')
            .set('x-access-token', goodToken)
            .send({
              bookId: 1,
              lendId: lndId,
            })
            .end((err, res) => {
              should.not.exist(err);
              res.status.should.equal(200);
              res.type.should.equal('application/json');
              res.body.status.should.eql('Unsuccessful');
              res.body.message.should.eql('Book Already Returned');
              done();
            });
        });
      });
    });
  });
  describe('GET /api/v4/users/history/:bookId version 4', () => {
    describe('When Invalid details are passed in', () => {
      it('should return 404 invalid Book Id', (done) => {
        chai.request(app)
          .get('/api/v4/users/history/ay39')
          .set('x-access-token', goodToken)
          .end((err, res) => {
            should.exist(err);
            res.status.should.equal(404);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('Invalid Book id');
            done();
          });
      });
      it('should return 404 invalid user Id', (done) => {
        chai.request(app)
          .get('/api/v4/users/history/1')
          .set('x-access-token', invalidUserIdToken)
          .end((err, res) => {
            should.exist(err);
            res.status.should.equal(404);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('Invalid User id');
            done();
          });
      });
    });
    describe('When Valid Details are passed in', () => {
      describe('When user does not exist on the database', () => {
        it('should return 401 Not Allowed', (done) => {
          chai.request(app)
            .get('/api/v4/users/history/1')
            .set('x-access-token', goodTokenInvalidUser)
            .end((err, res) => {
              should.exist(err);
              res.status.should.equal(401);
              res.type.should.equal('application/json');
              res.body.status.should.eql('Unsuccessful');
              res.body.message.should.eql('Not Allowed');
              done();
            });
        });
      });
    });
    it('should return 202 and details', (done) => {
      chai.request(app)
        .get('/api/v4/users/history/1')
        .set('x-access-token', goodToken)
        .end((error, response) => {
          should.not.exist(error);// or not
          response.status.should.equal(202);
          response.type.should.equal('application/json');
          done();
        });
    });
  });
  describe('Return Book DB ERROR', () => {
    it('should return 501 Unsuccessful', (done) => {
      db.BookLendings.drop().then(() => {
        chai.request(app)
          .put('/api/v4/users/1/books')
          .set('x-access-token', goodToken)
          .send({
            bookId: 1,
            lendId: 1,
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(500);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            should.exist(response.body.error);
            done();
          });
      });
    });
    describe('Borrow Book DB ERROR', () => {
      it('should return 501', (done) => {
        db.BookLendings.drop().then(() => {
          chai.request(app)
            .post('/api/v4/users/1/books')
            .set('x-access-token', goodToken)
            .send({
              bookId: 1,
              duedate: due,
            })
            .end((err, res) => {
              // should.exist(err);
              res.status.should.equal(501);
              res.type.should.equal('application/json');
              done();
            });
        });
      });
    });
  });
});
// .set('x-access-token', goodToken)

