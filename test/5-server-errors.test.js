import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';
import db from '../server/models';

import app from '../server';

require('./0-user-details.test');
require('./1-book-prop.test');
require('./2-helpers.test');
require('./3-middleware.test');
require('./4-user-book-interaction.test');

const should = chai.should();
chai.use(chaiHttp);

const someToken = jwt.sign({
  userId: 1,
  username: 'username',
  firstName: 'admin',
  lastName: 'User',
  role: 'User',
}, app.settings.JsonSecret);

let goodToken = '';
let goodTokenUserID = 0;
const goodToken2 = jwt.sign({
  userId: 2,
  username: 'SomebodyElse',
  firstName: 'Somebody',
  lastName: 'Else',
  role: 'User',
}, app.settings.JsonSecret);
const goodToken1 = jwt.sign({
  userId: 1,
  username: 'SomebodyElse',
  firstName: 'Somebody',
  lastName: 'Else',
  role: 'User',
}, app.settings.JsonSecret);
const todayDate = new Date();
const due = todayDate.setMonth(todayDate.getMonth() + 1);
describe('Database errors Simulations', () => {
  before((done) => {
    db.UserDetails
      .create({
        firstname: 'Admin2',
        lastname: 'AdminUser',
        emailaddress: 'adminuser2@admin.com',
        username: 'adminuserusername1',
        password: 'adminuserPassword',
        authString: 'randomString2',
        isAdmin: true,
        isActivated: true
      }).then((response) => {
        goodTokenUserID = response.id;
        goodToken = jwt.sign({
          userId: response.id,
          username: response.username,
          firstName: response.firstname,
          lastName: response.lastname,
          role: (response.isAdmin) ? 'Admin' : 'User',
        }, app.settings.JsonSecret);
        done();
      });
  });
  describe('User - Book Interactions', () => {
    describe('When Trying to borrow a book', () => {
      let bookLendingCreate;
      let bookLendingCount;
      let bookFindOne;
      let userDetailsFindOne;
      let userDetailsMembership;
      before((done) => {
        bookLendingCreate = db.BookLendings.create;
        bookLendingCount = db.BookLendings.count;
        bookFindOne = db.Books.findOne;
        userDetailsFindOne = db.UserDetails.findOne;
        userDetailsMembership = db.UserDetails.getMembership;
        done();
      });
      after((done) => {
        db.BookLendings.create = bookLendingCreate;
        db.BookLendings.count = bookLendingCount;
        db.Books.findOne = bookFindOne;
        db.UserDetails.findOne = userDetailsFindOne;
        db.UserDetails.getMembership = userDetailsMembership;
        done();
      });
      it('should return 501 Unsuccessful when model methods unavailable',
        (done) => {
          db.BookLendings.create = () => Promise.reject(1);
          chai.request(app)
            .post('/api/v4/users/2/books')
            .set('x-access-token', goodToken2)
            .send({
              bookId: 3,
              duedate: due,
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(501);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              should.exist(response.body.error);
              done();
            });
        });
      it('should return 501 Unsuccessful when model methods unavailable',
        (done) => {
          db.BookLendings.count = () => Promise.reject(1);
          db.Books.findOne = () => Promise.reject(1);
          db.UserDetails.getMembership = () => Promise.reject(1);
          chai.request(app)
            .post('/api/v4/users/2/books')
            .set('x-access-token', goodToken2)
            .send({
              bookId: 3,
              duedate: due,
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(501);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              should.exist(response.body.error);
              done();
            });
        });
      it('should return 501 Unsuccessful when model methods unavailable',
        (done) => {
          db.UserDetails.findOne = () => Promise.reject(1);
          chai.request(app)
            .post('/api/v4/users/2/books')
            .set('x-access-token', goodToken2)
            .send({
              bookId: 3,
              duedate: due,
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(501);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              should.exist(response.body.error);
              done();
            });
        });
    });
    describe('When trying to return a book', () => {
      let promiseAll;
      let bookLendingfindOne;
      let bookFindOne;
      before((done) => {
        promiseAll = Promise.all;
        bookLendingfindOne = db.BookLendings.findOne;
        bookFindOne = db.Books.findOne;
        done();
      });
      after((done) => {
        Promise.all = promiseAll;
        db.BookLendings.findOne = bookLendingfindOne;
        db.Books.findOne = bookFindOne;
        done();
      });

      it('should return 501 Unsuccessful for Books model error (update)',
        (done) => {
          Promise.all = () => Promise.reject(1);
          chai.request(app)
            .put('/api/v4/users/1/books')
            .set('x-access-token', goodToken1)
            .send({
              bookId: 2,
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
      it('should return 501 Unsuccessful for Books model error (findOne)',
        (done) => {
          db.Books.findOne = () => Promise.reject(1);
          chai.request(app)
            .put('/api/v4/users/1/books')
            .set('x-access-token', goodToken1)
            .send({
              bookId: 3,
              lendId: 3,
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
      it('should return 501 Unsuccessful for BookLendings model error',
        (done) => {
          db.BookLendings.findOne = () => Promise.reject(1);
          chai.request(app)
            .put(`/api/v4/users/${goodTokenUserID}/books`)
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
    describe('When trying to view user history', () => {
      let bookLendingCount;
      before((done) => {
        bookLendingCount = db.BookLendings.count;
        done();
      });
      after((done) => {
        db.BookLendings.count = bookLendingCount;
        done();
      });
      it('should return 500 Unsuccessful when BookLending method unavailable',
        (done) => {
          db.BookLendings.count = () => Promise.reject(1);
          chai.request(app)
            .get(`/api/v4/users/history/${goodTokenUserID}`)
            .set('x-access-token', goodToken)
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
    describe('When trying to view Lending history', () => {
      let bookLendingFindAll;
      before((done) => {
        bookLendingFindAll = db.BookLendings.findAll;
        done();
      });
      after((done) => {
        db.BookLendings.findAll = bookLendingFindAll;
        done();
      });
      it('should return 500 Unsuccessful when BookLending method unavailable',
        (done) => {
          db.BookLendings.findAll = () => Promise.reject(1);
          chai.request(app)
            .get(`/api/v4/users/${goodTokenUserID}/books`)
            .set('x-access-token', goodToken)
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
    describe('When trying to view Lending history (Paginated)', () => {
      let bookLendingFindAll;
      let bookLendingCountAll;
      before((done) => {
        bookLendingFindAll = db.BookLendings.findAll;
        bookLendingCountAll = db.BookLendings.count;
        done();
      });
      after((done) => {
        db.BookLendings.findAll = bookLendingFindAll;
        db.BookLendings.count = bookLendingCountAll;
        done();
      });
      it('should return 500 Unsuccessful when BookLending method unavailable',
        (done) => {
          db.BookLendings.findAll = () => Promise.reject(1);
          chai.request(app)
            .get(`/api/v4/users/${goodTokenUserID}/books/list/1`)
            .query({
              order: 'false',
              sort: 'dateborrowed',
              limit: '10'
            })
            .set('x-access-token', goodToken)
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(500);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              should.exist(response.body.error);
              done();
            });
        });
      it('should return 500 Unsuccessful when BookLending count method unavailable',
        (done) => {
          db.BookLendings.count = () => Promise.reject(1);
          chai.request(app)
            .get(`/api/v4/users/${goodTokenUserID}/books/list/1`)
            .query({
              order: 'false',
              sort: 'dateborrowed',
              limit: '10'
            })
            .set('x-access-token', goodToken)
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
  });
  describe('User Interactions', () => {
    describe('Check User exists controller', () => {
      let userDetailsfindOne = db.UserDetails.findOne;
      before((done) => {
        userDetailsfindOne = db.UserDetails.findOne;
        done();
      });
      after((done) => {
        db.UserDetails.findOne = userDetailsfindOne;
        done();
      });
      it('should return 500 Unsuccessful when user cannot be found',
        (done) => {
          db.UserDetails.findOne = () => Promise.reject(1);
          chai.request(app)
            .get('/api/v4/users/signupCheck/randomIdentifier')
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(500);
              response.type.should.equal('application/json');
              response.body.status.should.equal('Unsuccessful');
              should.exist(response.body.error);
              done();
            });
        });
    });
    describe('When Trying to signup', () => {
      let bcryptHashFunc;
      let jwtsecret;
      let memberShipFindID;
      before((done) => {
        memberShipFindID = db.Memberships.findById;
        bcryptHashFunc = bcrypt.hash;
        jwtsecret = app.get('JsonSecret');
        done();
      });
      after((done) => {
        bcrypt.hash = bcryptHashFunc;
        app.set('JsonSecret', jwtsecret);
        db.Memberships.findById = memberShipFindID;
        done();
      });
      it('Should respond with code 202 none for token generation error',
        (done) => {
          app.set('JsonSecret', undefined);
          chai.request(app)
            .post('/api/v4/users/signup')
            .send({
              password: 'TestUser123$',
              firstname: 'Test',
              username: 'Testuser123',
              lastname: 'User11',
              email: 'testuser@user.com.ng',
            })
            .end((error, response) => {
              should.not.exist(error);
              response.status.should.equal(202);
              response.type.should.equal('application/json');
              response.body.status.should.eql('none');
              should.exist(response.body.error);
              done();
            });
        });
      it('Should respond with code 500 Unsuccessful for membership model error',
        (done) => {
          db.Memberships.findById = () => Promise.reject(1);
          chai.request(app)
            .post('/api/v4/users/signup')
            .send({
              password: 'TestUser123$',
              firstname: 'Test',
              username: 'Testuser1234',
              lastname: 'User11',
              email: 'testuser2@user.com.ng',
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(501);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              should.exist(response.body.error);
              done();
            });
        });
      it('Should respond with code 500 Unsuccessful for bcrypt error',
        (done) => {
          bcrypt.hash = () => Promise.reject(1);
          chai.request(app)
            .post('/api/v4/users/signup')
            .send({
              password: 'TestUser123$',
              firstname: 'Test',
              username: 'Testuser123',
              lastname: 'User11',
              email: 'testuser@user.com.ng',
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(501);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              should.exist(response.body.error);
              done();
            });
        });
    });
    describe('When trying to activate user', () => {
      let userDetailsFindOne;
      before((done) => {
        userDetailsFindOne = db.UserDetails.findOne;
        done();
      });
      after((done) => {
        db.UserDetails.findOne = userDetailsFindOne;
        done();
      });
      it('should return 500 Unsuccessful', (done) => {
        db.UserDetails.findOne = () => Promise.reject(1);
        chai.request(app)
          .get('/api/v4/users/verify')
          .query({
            id: 'username',
            key: someToken,
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(500);
            response.type.should.equal('application/json');
            response.body.status.should.equal('Unsuccessful');
            should.exist(response.body.error);
            done();
          });
      });
    });
    describe('When trying to signin', () => {
      let userDetailsFindOne;
      let jwtsecret;
      let bcryptCompFunc;

      before((done) => {
        bcryptCompFunc = bcrypt.compare;
        jwtsecret = app.get('JsonSecret');
        userDetailsFindOne = db.UserDetails.findOne;
        done();
      });
      after((done) => {
        bcrypt.compare = bcryptCompFunc;
        app.set('JsonSecret', jwtsecret);
        db.UserDetails.findOne = userDetailsFindOne;
        done();
      });
      it('should return 501 Unsuccessful', (done) => {
        app.set('JsonSecret', undefined);
        chai.request(app)
          .post('/api/v4/users/signin')
          .send({
            password: 'TestUser123$',
            username: 'Testuser',
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(501);
            response.type.should.equal('application/json');
            response.body.status.should.equal('Unsuccessful');
            should.exist(response.body.error);
            done();
          });
      });
      it('should return 500 Unsuccessful', (done) => {
        bcrypt.compare = () => Promise.reject(1);
        chai.request(app)
          .post('/api/v4/users/signin')
          .send({
            password: 'TestUser123$',
            username: 'Testuser',
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(500);
            response.type.should.equal('application/json');
            response.body.status.should.equal('Unsuccessful');
            should.exist(response.body.error);
            done();
          });
      });
      it('should return 500 Unsuccessful', (done) => {
        db.UserDetails.findOne = () => Promise.reject(1);
        chai.request(app)
          .post('/api/v4/users/signin')
          .send({
            password: 'TestUser123$',
            username: 'Testuser',
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(500);
            response.type.should.equal('application/json');
            response.body.status.should.equal('Unsuccessful');
            should.exist(response.body.error);
            done();
          });
      });
    });
  });
  describe('Book Interactions', () => {
    describe('When trying to add books', () => {
      let bookCreate;
      let authorsFindAll;
      before((done) => {
        bookCreate = db.Books.create;
        authorsFindAll = db.Authors.findAll;
        done();
      });
      after((done) => {
        db.Books.create = bookCreate;
        db.Authors.findAll = authorsFindAll;
        done();
      });
      it('should return 501 Unsuccessful', (done) => {
        db.Books.create = () => Promise.reject(1);
        chai.request(app)
          .post('/api/v4/books')
          .set('x-access-token', goodToken)
          .send({
            quantity: 1,
            image: 'hppa.jpg',
            publishyear: '1999',
            bookname: 'Harry Potter and the Prisoner of Azkaban',
            ISBN: '0-7475-4215-5',
            description: `Harry is back at the Dursleys, 
                where he sees on Muggle television that a 
                prisoner named Sirius Black has escaped. 
                Harry involuntarily inflates Aunt Marge 
                when she comes to visit after she insults 
                Harry and his parents.`,
            authorIds: '2',
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(500);
            response.type.should.equal('application/json');
            response.body.status.should.equal('Unsuccessful');
            should.exist(response.body.error);
            done();
          });
      });
      it('should return 500 Unsuccessful', (done) => {
        db.Authors.findAll = () => Promise.reject(1);
        chai.request(app)
          .post('/api/v4/books')
          .set('x-access-token', goodToken)
          .send({
            quantity: 1,
            image: 'hppa.jpg',
            publishyear: '1999',
            bookname: 'Harry Potter and the Prisoner of Azkaban',
            ISBN: '0-7475-4215-5',
            description: `Harry is back at the Dursleys, 
                where he sees on Muggle television that a 
                prisoner named Sirius Black has escaped. 
                Harry involuntarily inflates Aunt Marge 
                when she comes to visit after she insults 
                Harry and his parents.`,
            authorIds: '2',
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(500);
            response.type.should.equal('application/json');
            response.body.status.should.equal('Unsuccessful');
            should.exist(response.body.error);
            done();
          });
      });
    });

    describe('When trying to get books List', () => {
      let bookFindAll;
      let bookCount;
      before((done) => {
        bookFindAll = db.Books.findAll;
        bookCount = db.Books.count;
        done();
      });
      after((done) => {
        db.Books.findAll = bookFindAll;
        db.Books.count = bookCount;
        done();
      });
      it('should return 500 Unsuccessful', (done) => {
        db.Books.findAll = () => Promise.reject(1);
        chai.request(app)
          .get('/api/v4/books/list/1?limit=10')
          .set('x-access-token', goodToken)
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(500);
            response.type.should.equal('application/json');
            response.body.status.should.equal('Unsuccessful');
            should.exist(response.body.error);
            done();
          });
      });
      it('should return 500 Unsuccessful', (done) => {
        db.Books.count = () => Promise.reject(1);
        chai.request(app)
          .get('/api/v4/books/list/1?limit=10')
          .set('x-access-token', goodToken)
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(500);
            response.type.should.equal('application/json');
            response.body.status.should.equal('Unsuccessful');
            should.exist(response.body.error);
            done();
          });
      });
    });
    describe('When trying to get books', () => {
      let bookFindAll;
      let bookFindOne;
      before((done) => {
        bookFindAll = db.Books.findAll;
        bookFindOne = db.Books.findOne;
        done();
      });
      after((done) => {
        db.Books.findAll = bookFindAll;
        db.Books.findOne = bookFindOne;
        done();
      });
      it('should return 500 Unsuccessful', (done) => {
        db.Books.findAll = () => Promise.reject(1);
        chai.request(app)
          .get('/api/v4/books')
          .set('x-access-token', goodToken)
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(500);
            response.type.should.equal('application/json');
            response.body.status.should.equal('Unsuccessful');
            should.exist(response.body.error);
            done();
          });
      });
      it('should return 500 Unsuccessful for particular book',
        (done) => {
          db.Books.findOne = () => Promise.reject(1);
          chai.request(app)
            .get('/api/v4/books')
            .query({
              id: 1,
            })
            .set('x-access-token', goodToken)
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(500);
              response.type.should.equal('application/json');
              response.body.status.should.equal('Unsuccessful');
              should.exist(response.body.error);
              done();
            });
        });
    });
    describe('When trying to modify a particular book', () => {
      let bookFindOne;
      before((done) => {
        bookFindOne = db.Books.findOne;
        done();
      });
      after((done) => {
        db.Books.findOne = bookFindOne;
        done();
      });
      it('should return 500 Unsuccessful', (done) => {
        db.Books.findOne = () => Promise.reject(1);
        chai.request(app)
          .put('/api/v4/books/3')
          .set('x-access-token', goodToken)
          .send({
            bookISBN: '0-7475-5100-6',
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(500);
            response.type.should.equal('application/json');
            response.body.status.should.equal('Unsuccessful');
            should.exist(response.body.error);
            done();
          });
      });
    });
    describe('When trying to create authors', () => {
      let authorsCreate;
      before((done) => {
        authorsCreate = db.Authors.create;
        done();
      });
      after((done) => {
        db.Authors.create = authorsCreate;
        done();
      });
      it('should return 500 Unsuccessful', (done) => {
        db.Authors.create = () => Promise.reject(1);
        chai.request(app)
          .post('/api/v4/authors')
          .set('x-access-token', goodToken)
          .send({
            firstname: 'Joanne',
            lastname: 'Rowling',
            authorAKA: 'J.K Rowling',
            authorDOB: '1965-07-31',
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(500);
            response.type.should.equal('application/json');
            response.body.status.should.equal('Unsuccessful');
            should.exist(response.body.error);
            done();
          });
      });
    });
  });
});
