import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server';

import {
  firstGoodToken,
  invalidUserIdToken,
  goodTokenInvalidUser,
  secondGoodToken,
  due
} from './mockData';

const should = chai.should();

chai.use(chaiHttp);
chai.use(require('chai-things'));

require('./userAuthentication.test');
require('./bookProp.test');
require('./helpers.test');
require('./middleware.test');

let theLendId;
describe('User Book Interaction tests', () => {
  describe('POST /api/v1/users/:userId/books version 1', () => {
    describe('When incomplete Information is provided', () => {
      it('should return 404 invalid Book Id', (done) => {
        chai.request(app)
          .post('/api/v1/users/1/books')
          .set('x-access-token', firstGoodToken)
          .send({
            duedate: due,
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(404);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Invalid Book id');
            done();
          });
      });
      it('should return 404 invalid User Id', (done) => {
        chai.request(app)
          .post('/api/v1/users/q/books')
          .set('x-access-token', firstGoodToken)
          .send({
            bookId: 1,
            duedate: due,
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(404);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Invalid User id');
            done();
          });
      });
      it(`should return 400 Invalid Due
       Date when no duedate is sent`,
        (done) => {
          chai.request(app)
            .post('/api/v1/users/1/books')
            .set('x-access-token', firstGoodToken)
            .send({
              bookId: 1
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(400);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('Invalid Due date');
              done();
            });
        });
    });
    describe('When Complete Information is provided', () => {
      describe('When invalid info is sent', () => {
        it('should return 400 Invalid Due Date', (done) => {
          chai.request(app)
            .post('/api/v1/users/1/books')
            .set('x-access-token', firstGoodToken)
            .send({
              bookId: 1,
              duedate: 'rubbishDateFam',
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(400);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('Invalid Due date');
              done();
            });
        });
      });
      it('should return 401 when wrong user tries to borrow books', (done) => {
        chai.request(app)
          .post('/api/v1/users/3/books')// doesn't match token
          .set('x-access-token', firstGoodToken)
          .send({
            bookId: 1,
            duedate: due,
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(401);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Not Allowed');
            done();
          });
      });
      it('should return 401 when invalid user tries to borrow books',
        (done) => {
          chai.request(app)
            .post('/api/v1/users/40/books')// doesn't match token
            .set('x-access-token', goodTokenInvalidUser)
            .send({
              bookId: 1,
              duedate: due,
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(401);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('Not Allowed');
              done();
            });
        });
      it('should return 400 when No such book exists', (done) => {
        chai.request(app)
          .post('/api/v1/users/1/books')// doesn't match token
          .set('x-access-token', firstGoodToken)
          .send({
            bookId: 199,
            duedate: due,
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(400);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Invalid Book');
            done();
          });
      });
      it('should return 202 Successfully Borrowed', (done) => {
        chai.request(app)
          .post('/api/v1/users/1/books')
          .set('x-access-token', firstGoodToken)
          .send({
            bookId: 2,
            duedate: due,
          })
          .end((error, response) => {
            should.not.exist(error);
            response.status.should.equal(202);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Success');
            response.body.message.should.eql('Book Successfully Borrowed');
            done();
          });
      });
      it('should return 202 Successfully Borrowed', (done) => {
        chai.request(app)
          .post('/api/v1/users/1/books')
          .set('x-access-token', firstGoodToken)
          .send({
            bookId: 1,
            duedate: due,
          })
          .end((error, response) => {
            should.not.exist(error);
            response.status.should.equal(202);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Success');
            response.body.message.should.eql('Book Successfully Borrowed');
            theLendId = response.body.lendId;
            done();
          });
      });
      describe('When Book is not available', () => {
        it('should return 200 Book Unavailable', (done) => {
          chai.request(app)
            .post('/api/v1/users/1/books')
            .set('x-access-token', firstGoodToken)
            .send({
              bookId: 2,
              duedate: due,
            })
            .end((error, response) => {
              should.not.exist(error);
              response.status.should.equal(200);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('Book Unavailable');
              done();
            });
        });
      });

      describe('When User has borrowed max number of books', () => {
        before((done) => {
          chai.request(app)
            .post('/api/v1/users/1/books')
            .set('x-access-token', firstGoodToken)
            .send({
              bookId: 3,
              duedate: due,
            })
            .end((error, response) => {
              should.not.exist(error);
              response.status.should.equal(202);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Success');
              response.body.message.should.eql('Book Successfully Borrowed');
              done();
            });
        });
        it('should return 200 Max Limit Reached', (done) => {
          chai.request(app)
            .post('/api/v1/users/1/books')
            .set('x-access-token', firstGoodToken)
            .send({
              bookId: 4,
              duedate: due,
            })
            .end((error, response) => {
              should.not.exist(error);
              response.status.should.equal(200);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('Max borrow limit reached');
              done();
            });
        });
      });
    });
  });
  describe('GET /api/v1/users/:userId/books version 1', () => {
    describe('When incomplete Information is provided', () => {
      it('should return 404 invalid User Id', (done) => {
        chai.request(app)
          .get('/api/v1/users/q/books')
          .set('x-access-token', firstGoodToken)
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(404);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Invalid User id');
            done();
          });
      });
    });
    describe('When Complete Information is provided', () => {
      it('should return 401 when wrong user tries to borrow books',
        (done) => {
          chai.request(app)
            .get('/api/v1/users/3/books')// doesn't match token
            .set('x-access-token', firstGoodToken)
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(401);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('Not Allowed');
              done();
            });
        });
      it('should return 401 when invalid user tries to view borrow books',
        (done) => {
          chai.request(app)
            .get('/api/v1/users/40/books')// doesn't match token
            .set('x-access-token', goodTokenInvalidUser)
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(401);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('Not Allowed');
              done();
            });
        });
      it('should return 200 Unsuccessful when User hasn\'t borrowed any books',
        (done) => {
          chai.request(app)
            .get('/api/v1/users/2/books')// doesn't match token
            .set('x-access-token', secondGoodToken)
            .end((error, response) => {
              should.not.exist(error);
              response.status.should.equal(200);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('No borrowed Books');
              done();
            });
        });
      it('should return 202 and book list', (done) => {
        chai.request(app)
          .get('/api/v1/users/1/books')
          .set('x-access-token', firstGoodToken)
          .end((error, response) => {
            should.not.exist(error);
            response.status.should.equal(202);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Success');
            should.exist(response.body.borrowedBooks);
            done();
          });
      });
      it('should return 202 and book list', (done) => {
        chai.request(app)
          .get('/api/v1/users/1/books')
          .query({
            returned: 'false'
          })
          .set('x-access-token', firstGoodToken)
          .end((error, response) => {
            should.not.exist(error);
            response.status.should.equal(202);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Success');
            should.exist(response.body.borrowedBooks);
            done();
          });
      });
    });
  });
  describe('GET /api/v1/users/:userId/books/list/:page version 1', () => {
    describe('When incomplete Information is provided', () => {
      it('should return a 400 when no limit is sent', (done) => {
        chai.request(app)
          .get('/api/v1/users/1/books/list/1')
          .query({
            order: 'false',
            sort: 'dateborrowed',
          })
          .set('x-access-token', firstGoodToken)
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(400);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.all.have.property('error');
            response.body.message.should.all.have.property('field');
            response.body.message.should
              .contain.an.item.with.property('field', 'limit');
            response.body.message.should.contain.an
              .item.with.property('error', 'Invalid limit sent');
            done();
          });
      });
      it('should return a 400 when invalid limit is sent', (done) => {
        chai.request(app)
          .get('/api/v1/users/1/books/list/1')
          .query({
            order: 'false',
            sort: 'dateborrowed',
            limit: '-10'
          })
          .set('x-access-token', firstGoodToken)
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(400);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.all.have.property('error');
            response.body.message.should.all.have.property('field');
            response.body.message.should
              .contain.an.item.with.property('field', 'limit');
            response.body.message.should.contain.an
              .item.with.property('error', 'Invalid limit sent');
            done();
          });
      });
      it('should return a 400 when invalid page is sent', (done) => {
        chai.request(app)
          .get('/api/v1/users/1/books/list/invalidNumber')
          .query({
            order: 'false',
            sort: 'dateborrowed',
            limit: '50'
          })
          .set('x-access-token', firstGoodToken)
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(400);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.all.have.property('error');
            response.body.message.should.all.have.property('field');
            response.body.message.should
              .contain.an.item.with.property('field', 'page');
            response.body.message.should.contain.an
              .item.with.property('error', 'Invalid Page sent');
            done();
          });
      });
      it('should return a 400 when page number is less than 1', (done) => {
        chai.request(app)
          .get('/api/v1/users/1/books/list/0')
          .query({
            order: 'true',
            sort: 'dateborrowed',
            limit: '50'
          })
          .set('x-access-token', firstGoodToken)
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(400);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.all.have.property('error');
            response.body.message.should.all.have.property('field');
            response.body.message.should
              .contain.an.item.with.property('field', 'page');
            response.body.message.should.contain.an
              .item.with.property('error', 'Invalid Page sent');
            done();
          });
      });
      it('should return 400 when multiple details are invalid', (done) => {
        chai.request(app)
          .get('/api/v1/users/1/books/list/invalid')
          .query({
            order: 'false',
            sort: 'dateborrowed',
            limit: 'invalid'
          })
          .set('x-access-token', firstGoodToken)
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(400);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.all.have.property('error');
            response.body.message.should.all.have.property('field');
            response.body.message.should
              .contain.an.item.with.property('field', 'limit');
            response.body.message.should
              .contain.an.item.with.property('field', 'page');
            response.body.message.should.contain.an
              .item.with.property('error', 'Invalid limit sent');
            response.body.message.should.contain.an
              .item.with.property('error', 'Invalid Page sent');
            done();
          });
      });
    });
    it('should return 404 invalid User Id', (done) => {
      chai.request(app)
        .get('/api/v1/users/q/books/list/1')
        .set('x-access-token', firstGoodToken)
        .end((error, response) => {
          should.exist(error);
          response.status.should.equal(404);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Unsuccessful');
          response.body.message.should.eql('Invalid User id');
          done();
        });
    });
  });
  describe('When Complete Information is provided', () => {
    it('should return 401 when wrong user tries to borrow books',
      (done) => {
        chai.request(app)
          .get('/api/v1/users/3/books/list/1')
          .set('x-access-token', firstGoodToken)
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(401);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Not Allowed');
            done();
          });
      });
    it('should return 401 when invalid user tries to view borrow books',
      (done) => {
        chai.request(app)
          .get('/api/v1/users/40/books/list/1')
          .set('x-access-token', goodTokenInvalidUser)
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(401);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Not Allowed');
            done();
          });
      });
    it('should return 200 Unsuccessful when User hasn\'t borrowed any books',
      (done) => {
        chai.request(app)
          .get('/api/v1/users/2/books/list/1')
          .query({
            order: 'false',
            sort: 'dateborrowed',
            limit: '10'
          })
          .set('x-access-token', secondGoodToken)
          .end((error, response) => {
            should.not.exist(error);
            response.status.should.equal(200);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('No borrowed Books');
            done();
          });
      });
    it('should return 202 and book list', (done) => {
      chai.request(app)
        .get('/api/v1/users/1/books/list/1')
        .query({
          order: 'true',
          sort: 'returndate',
          limit: '50'
        })
        .set('x-access-token', firstGoodToken)
        .end((error, response) => {
          should.not.exist(error);
          response.status.should.equal(202);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Success');
          response.body.totalPages.should.eql(1);
          should.exist(response.body.borrowedBooks);
          done();
        });
    });
    it('should return 202 and book list', (done) => {
      chai.request(app)
        .get('/api/v1/users/1/books/list/1')
        .query({
          order: 'false',
          sort: 'duedate',
          limit: '50'
        })
        .set('x-access-token', firstGoodToken)
        .end((error, response) => {
          should.not.exist(error);
          response.status.should.equal(202);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Success');
          response.body.totalPages.should.eql(1);
          should.exist(response.body.borrowedBooks);
          done();
        });
    });
    it('should return 202 and book list', (done) => {
      chai.request(app)
        .get('/api/v1/users/1/books/list/1')
        .query({
          order: 'false',
          sort: 'dateborrowed',
          returned: 'false',
          limit: '50'
        })
        .set('x-access-token', firstGoodToken)
        .end((error, response) => {
          should.not.exist(error);
          response.status.should.equal(202);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Success');
          response.body.totalPages.should.eql(1);
          should.exist(response.body.borrowedBooks);
          done();
        });
    });
  });
  describe('PUT /api/v1/users/:userId/books version 1', () => {
    describe('When incomplete Information is provided', () => {
      it('should return 404 invalid Book Id', (done) => {
        chai.request(app)
          .put('/api/v1/users/1/books')
          .set('x-access-token', firstGoodToken)
          .send({
            lendId: 1,
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(404);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Invalid Book id');
            done();
          });
      });
      it('should return 404 invalid Book Id for invalid bookId', (done) => {
        chai.request(app)
          .put('/api/v1/users/1/books')
          .set('x-access-token', firstGoodToken)
          .send({
            bookId: 'q3',
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(404);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Invalid Book id');
            done();
          });
      });
      it('should return 404 invalid User Id', (done) => {
        chai.request(app)
          .put('/api/v1/users/q/books')
          .set('x-access-token', firstGoodToken)
          .send({
            bookId: 1,
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(404);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Invalid User id');
            done();
          });
      });
      it('should return 404 void lend Id', (done) => {
        chai.request(app)
          .put('/api/v1/users/1/books')
          .set('x-access-token', firstGoodToken)
          .send({
            bookId: 1,
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(404);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Invalid');
            done();
          });
      });
      it('should return 404 invalid for invalid lend Id', (done) => {
        chai.request(app)
          .put('/api/v1/users/1/books')
          .set('x-access-token', firstGoodToken)
          .send({
            bookId: 1,
            lendId: 'abvs',
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(404);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Invalid');
            done();
          });
      });
    });
    describe('When Complete Information is provided', () => {
      it('should return 401 when wrong user tries to return books', (done) => {
        chai.request(app)
          .put('/api/v1/users/3/books')// doesn't match token
          .set('x-access-token', firstGoodToken)
          .send({
            bookId: 1,
            lendId: 1,
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(401);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Not Allowed');
            done();
          });
      });
      it('should return 401 when invalid user tries to return books',
        (done) => {
          chai.request(app)
            .put('/api/v1/users/40/books')// doesn't match token
            .set('x-access-token', goodTokenInvalidUser)
            .send({
              bookId: 1,
              lendId: 1,
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(401);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('Not Allowed');
              done();
            });
        });
      it('should return 404 when No record of borrowed book exists', (done) => {
        chai.request(app)
          .put('/api/v1/users/1/books')// doesn't match token
          .set('x-access-token', firstGoodToken)
          .send({
            bookId: 1,
            lendId: 309,
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(404);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('No records found');
            done();
          });
      });
      it('should return 401 when lendId does not match details', (done) => {
        chai.request(app)
          .put('/api/v1/users/1/books')// doesn't match token
          .set('x-access-token', firstGoodToken)
          .send({
            bookId: 1,
            lendId: 1,
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(400);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('User/Book not matching records');
            done();
          });
      });
      it('should return 202 Successfully Returned', (done) => {
        chai.request(app)
          .put('/api/v1/users/1/books')
          .set('x-access-token', firstGoodToken)
          .send({
            bookId: 1,
            lendId: theLendId,
          })
          .end((error, response) => {
            should.not.exist(error);
            response.status.should.equal(202);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Success');
            response.body.message.should.eql('Book Returned Successfully');
            should.exist(response.body.bookDetails);
            done();
          });
      });
      describe('When Book has been returned', () => {
        it('should return 200 Book Already Returned', (done) => {
          chai.request(app)
            .put('/api/v1/users/1/books')
            .set('x-access-token', firstGoodToken)
            .send({
              bookId: 1,
              lendId: theLendId,
            })
            .end((error, response) => {
              should.not.exist(error);
              response.status.should.equal(200);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('Book Already Returned');
              done();
            });
        });
      });
    });
  });
  describe('GET /api/v1/users/history/:bookId version 1', () => {
    describe('When Invalid details are passed in', () => {
      it('should return 404 invalid Book Id', (done) => {
        chai.request(app)
          .get('/api/v1/users/history/ay39')
          .set('x-access-token', firstGoodToken)
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(404);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Invalid Book id');
            done();
          });
      });
      it('should return 404 invalid user Id', (done) => {
        chai.request(app)
          .get('/api/v1/users/history/1')
          .set('x-access-token', invalidUserIdToken)
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(404);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Invalid User id');
            done();
          });
      });
    });
    describe('When Valid Details are passed in', () => {
      describe('When user does not exist on the database', () => {
        it('should return 401 Not Allowed', (done) => {
          chai.request(app)
            .get('/api/v1/users/history/1')
            .set('x-access-token', goodTokenInvalidUser)
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(401);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('Not Allowed');
              done();
            });
        });
      });
    });
    it('should return 202 and details', (done) => {
      chai.request(app)
        .get('/api/v1/users/history/1')
        .set('x-access-token', firstGoodToken)
        .end((error, response) => {
          should.not.exist(error);
          response.status.should.equal(202);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Success');
          should.exist(response.body.unreturnedBookCount);
          should.exist(response.body.userBook);
          should.exist(response.body.membershipDetail);
          done();
        });
    });
  });
});
