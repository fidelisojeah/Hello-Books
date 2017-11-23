import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';

import { Books, Authors, UserDetails } from '../server/models';
import app from '../server';

require('./bookprop.v4.test');
require('./helpers.test');
require('./middleware.v4.test');
require('./UserDetails.v4.test');
require('./userz-book-interaction.v4.test');

const should = chai.should();
chai.use(chaiHttp);

const someToken = jwt.sign({
  userId: 1,
  username: 'username',
  firstName: 'admin',
  lastName: 'User',
  role: 'User',
}, app.settings.JsonSecret);

const goodToken = jwt.sign({
  userId: 1,
  username: 'adminUser',
  firstName: 'admin',
  lastName: 'User',
  role: 'Admin',
}, app.settings.JsonSecret);

describe('Database errors Simulations', () => {
  describe('When trying to check if user exists', () => {
    it('should return 500 Unsuccessful when user cannot be found', (done) => {
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
  describe('When trying to activate user', () => {
    it('should return 500 Unsuccessful', (done) => {
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
    it('should return 500 Unsuccessful', (done) => {
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
  describe('When trying to add books', () => {
    it('should return 500 Unsuccessful', (done) => {
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
  describe('When trying to get books', () => {
    it('should return 500 Unsuccessful', (done) => {
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
  });
  describe('When trying to get particular book', () => {
    it('should return 500 Unsuccessful', (done) => {
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
    it('should return 500 Unsuccessful', (done) => {
      Books.drop().then(() => {
        chai.request(app)
          .put('/api/v4/books/3')
          .set('x-access-token', goodToken)
          .send({
            ISBN: '0-7475-5100-6',
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
  describe('When trying to create authors', () => {
    it('should return 500 Unsuccessful', (done) => {
      Authors.drop();
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
  describe('When trying to search books', () => {
    it('should return 500 Unsuccessful', (done) => {
      Books.drop().then(() => {
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
  });
  describe('When trying to return books', () => {
    before((done) => {
      Books.drop();
      UserDetails
        .drop()
        .then(() => {
          done();
        })
        .catch(() => {
          done();
        });
    });
    it('should return 501 Unsuccessful', (done) => {
      chai.request(app)
        .put('/api/v4/users/1/books')
        .set('x-access-token', goodToken)
        .send({
          bookId: 1,
          lendId: 1,
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
});
