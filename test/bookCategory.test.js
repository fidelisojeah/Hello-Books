import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';


import {
  UserDetails
} from '../server/models';
import { nonAdminToken } from './mockData';
import app from '../server';

const should = chai.should();

chai.use(chaiHttp);
chai.use(require('chai-things'));

let goodAdminToken = '';

describe('POST /api/v1/books/category', () => {
  before((done) => {
    chai.request(app).get('/api/v1/users/logout').end(done);
  });
  describe('When Valid token is provided', () => {
    before((done) => {
      UserDetails
        .create({
          firstname: 'Admin',
          lastname: 'AdminUser',
          emailaddress: 'secondadminuser@admin.com',
          username: 'adminuseruser',
          password: 'adminuserPassword',
          authString: 'randomString',
          isAdmin: true,
          isActivated: true
        }).then((response) => {
          goodAdminToken = jwt.sign({
            userId: response.id,
            username: response.username,
            firstName: response.firstname,
            lastName: response.lastname,
            role: (response.isAdmin) ? 'Admin' : 'User',
          }, app.settings.JsonSecret);
          done();
        });
    });
    describe('When incomplete information is provided', () => {
      it('should return 400 for no Category Name provided', (done) => {
        chai.request(app)
          .post('/api/v1/books/category')
          .set('x-access-token', goodAdminToken)
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(400);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Incomplete details');
            done();
          });
      });
    });
    describe('When complete information is supplied', () => {
      describe('When non-duplicate information is provided', () => {
        it('should return 201 success', (done) => {
          chai.request(app)
            .post('/api/v1/books/category')
            .set('x-access-token', goodAdminToken)
            .send({
              categoryName: 'Drama',
            })
            .end((error, response) => {
              should.not.exist(error);
              response.status.should.equal(201);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Success');
              response.body.message.should.eql('Category Created Successfully');
              done();
            });
        });
        it('should return 201 success', (done) => {
          chai.request(app)
            .post('/api/v1/books/category')
            .set('x-access-token', goodAdminToken)
            .send({
              categoryName: 'Triller',
            })
            .end((error, response) => {
              should.not.exist(error);
              response.status.should.equal(201);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Success');
              response.body.message.should.eql('Category Created Successfully');
              done();
            });
        });
        it('should return 201 success', (done) => {
          chai.request(app)
            .post('/api/v1/books/category')
            .set('x-access-token', goodAdminToken)
            .send({
              categoryName: 'Adventure',
            })
            .end((error, response) => {
              should.not.exist(error);
              response.status.should.equal(201);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Success');
              response.body.message.should.eql('Category Created Successfully');
              done();
            });
        });
        it('should return 201 success', (done) => {
          chai.request(app)
            .post('/api/v1/books/category')
            .set('x-access-token', goodAdminToken)
            .send({
              categoryName: 'Horror',
            })
            .end((error, response) => {
              should.not.exist(error);
              response.status.should.equal(201);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Success');
              response.body.message.should.eql('Category Created Successfully');
              done();
            });
        });
        it('should return 201 success', (done) => {
          chai.request(app)
            .post('/api/v1/books/category')
            .set('x-access-token', goodAdminToken)
            .send({
              categoryName: 'Utility',
            })
            .end((error, response) => {
              should.not.exist(error);
              response.status.should.equal(201);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Success');
              response.body.message.should.eql('Category Created Successfully');
              done();
            });
        });
      });
      describe('When Duplicate Information is provided', () => {
        it('should return 400 Unsuccessful', (done) => {
          chai.request(app)
            .post('/api/v1/books/category')
            .set('x-access-token', goodAdminToken)
            .send({
              categoryName: 'Drama',
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(400);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('categoryName must be unique');
              done();
            });
        });
      });
    });
  });
  describe('When non admin token is provided', () => {
    it('Should return a 401 error', (done) => {
      chai.request(app)
        .post('/api/v1/books/category')
        .set('x-access-token', nonAdminToken)
        .send({
          categoryName: 'Prose'
        })
        .end((error, response) => {
          should.exist(error);
          response.status.should.equal(401);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Unsuccessful');
          response.body.message.should.eql('Not allowed');
          done();
        });
    });
  });
});

describe('PUT /api/v1/books/category', () => {
  describe('When Invalid Entries are entered', () => {
    it('should return 400 Unsuccessful when no Book Id is sent',
      (done) => {
        chai.request(app)
          .put('/api/v1/books/category')
          .set('x-access-token', goodAdminToken)
          .send({
            bookId: 1,
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(400);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Incomplete details');
            done();
          });
      });
    it('should return 400 Unsuccessful when no Category Id is sent',
      (done) => {
        chai.request(app)
          .put('/api/v1/books/category')
          .set('x-access-token', goodAdminToken)
          .send({
            categoryId: 1
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(400);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Incomplete details');
            done();
          });
      });
    it('should return 400 Unsuccessful when wrong Book Id is sent',
      (done) => {
        chai.request(app)
          .put('/api/v1/books/category')
          .set('x-access-token', goodAdminToken)
          .send({
            bookId: 140,
            categoryId: 1
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(400);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Invalid Book/Category');
            done();
          });
      });
    it('should return 400 Unsuccessful when wrong Category Id is sent',
      (done) => {
        chai.request(app)
          .put('/api/v1/books/category')
          .set('x-access-token', goodAdminToken)
          .send({
            bookId: 1,
            categoryId: 1213
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(400);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Invalid Book/Category');
            done();
          });
      });
  });
  describe('When Valid enteries are entered', () => {
    it('should return 200 Successful',
      (done) => {
        chai.request(app)
          .put('/api/v1/books/category')
          .set('x-access-token', goodAdminToken)
          .send({
            bookId: 1,
            categoryId: 1
          })
          .end((error, response) => {
            should.not.exist(error);
            response.status.should.equal(200);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Success');
            response.body
              .message.should.eql('Book Added to Category Successfully');
            done();
          });
      });
    it('should return 200 Successful',
      (done) => {
        chai.request(app)
          .put('/api/v1/books/category')
          .set('x-access-token', goodAdminToken)
          .send({
            bookId: 1,
            categoryId: 3
          })
          .end((error, response) => {
            should.not.exist(error);
            response.status.should.equal(200);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Success');
            response.body
              .message.should.eql('Book Added to Category Successfully');
            done();
          });
      });
  });
});
describe('GET /api/v1/books/category/:categoryId version 1', () => {
  describe('when incomplete details are passed in', () => {
    it('should return a 400 when invalid page is sent', (done) => {
      chai.request(app)
        .get('/api/v1/books/category/invalid')
        .set('x-access-token', goodAdminToken)
        .end((error, response) => {
          should.exist(error);
          response.status.should.equal(400);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Unsuccessful');
          response.body.message.should.eql('Category not Specified');
          done();
        });
    });
  });
  describe('when Complete details are passed in', () => {
    it('should return a 200 with information', (done) => {
      chai.request(app)
        .get('/api/v1/books/category/2')
        .query({
          limit: 10,
          page: 1
        })
        .set('x-access-token', goodAdminToken)
        .end((error, response) => {
          should.not.exist(error);
          response.status.should.equal(200);
          response.type.should.equal('application/json');
          response.body.status.should.eql('None');
          response.body.message.should.eql('No Books in Category');
          done();
        });
    });
    it('should return a 200 with information', (done) => {
      chai.request(app)
        .get('/api/v1/books/category/1')
        .query({
          limit: 10,
          sort: 'rating'
        })
        .set('x-access-token', goodAdminToken)
        .end((error, response) => {
          should.not.exist(error);
          response.status.should.equal(200);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Success');
          response.body.bookLists.should.all.have.property('id');
          response.body.bookLists.should.all.have.property('bookName');
          response.body.bookLists.should.all.have.property('description');
          response.body.bookLists.should.all.have.property('bookImage');
          response.body.bookLists.should.all.have.property('publishYear');
          response.body.bookLists.should.all.have.property('RatingCount');
          response.body.bookLists.should.all.have.property('RatingSum');
          response.body.bookLists.should.all.have.property('ratingAvg');
          should.exist(response.body.totalPages);
          should.exist(response.body.totalBooksCount);
          done();
        });
    });
    it('should return a 200 with information', (done) => {
      chai.request(app)
        .get('/api/v1/books/category/1')
        .query({
          sort: 'alphabetical'
        })
        .set('x-access-token', goodAdminToken)
        .end((error, response) => {
          should.not.exist(error);
          response.status.should.equal(200);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Success');
          response.body.bookLists.should.all.have.property('id');
          response.body.bookLists.should.all.have.property('bookName');
          response.body.bookLists.should.all.have.property('description');
          response.body.bookLists.should.all.have.property('bookImage');
          response.body.bookLists.should.all.have.property('publishYear');
          response.body.bookLists.should.all.have.property('RatingCount');
          response.body.bookLists.should.all.have.property('RatingSum');
          response.body.bookLists.should.all.have.property('ratingAvg');
          should.exist(response.body.totalPages);
          should.exist(response.body.totalBooksCount);
          done();
        });
    });
  });
});
describe('DELETE /api/v1/book/category', () => {
  describe('When Invalid Entries are entered', () => {
    it('should return 400 Unsuccessful when no category Id is sent',
      (done) => {
        chai.request(app)
          .delete('/api/v1/book/category')
          .set('x-access-token', goodAdminToken)
          .send({
            bookId: 1,
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(400);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Incomplete details');
            done();
          });
      });
    it('should return 400 Unsuccessful when no Book Id is sent',
      (done) => {
        chai.request(app)
          .delete('/api/v1/book/category')
          .set('x-access-token', goodAdminToken)
          .send({
            categoryId: 1
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(400);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Incomplete details');
            done();
          });
      });
    it('should return 400 Unsuccessful when wrong Book Id is sent',
      (done) => {
        chai.request(app)
          .delete('/api/v1/book/category')
          .set('x-access-token', goodAdminToken)
          .send({
            bookId: 140,
            categoryId: 1
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(400);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Invalid Book/Category');
            done();
          });
      });
    it('should return 400 Unsuccessful when wrong Category Id is sent',
      (done) => {
        chai.request(app)
          .delete('/api/v1/book/category')
          .set('x-access-token', goodAdminToken)
          .send({
            bookId: 1,
            categoryId: 1213
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(400);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Invalid Book/Category');
            done();
          });
      });
  });
  describe('When Valid enteries are entered', () => {
    it('should return 200 Successful',
      (done) => {
        chai.request(app)
          .delete('/api/v1/book/category')
          .set('x-access-token', goodAdminToken)
          .send({
            bookId: 1,
            categoryId: 1
          })
          .end((error, response) => {
            should.not.exist(error);
            response.status.should.equal(200);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Success');
            response.body
              .message.should.eql('Book Removed from Category Successfully');
            done();
          });
      });
  });
});

describe('GET /api/v1/search/categories', () => {
  describe('When no details are provided', () => {
    it('should return 200 Type Category details', (done) => {
      chai.request(app)
        .get('/api/v1/search/categories')
        .set('x-access-token', goodAdminToken)
        .end((error, response) => {
          should.not.exist(error);
          response.status.should.equal(200);
          response.type.should.equal('application/json');
          response.body.status.should.eql('None');
          response.body.message.should.eql('Type Category details');
          done();
        });
    });
  });
  describe('When Details are entered', () => {
    it('should return 200 NO category found when no category exists',
      (done) => {
        chai.request(app)
          .get('/api/v1/search/categories')
          .query({
            q: 'gegegegegegegeg'
          })
          .set('x-access-token', goodAdminToken)
          .end((error, response) => {
            should.not.exist(error);
            response.status.should.equal(200);
            response.type.should.equal('application/json');
            response.body.status.should.eql('None');
            response.body.message.should.eql('No Categories');
            done();
          });
      });
    it('should return 202 and category details',
      (done) => {
        chai.request(app)
          .get('/api/v1/search/categories')
          .query({
            q: 'A'
          })
          .set('x-access-token', goodAdminToken)
          .end((error, response) => {
            should.not.exist(error);
            response.status.should.equal(202);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Success');
            done();
          });
      });
  });
});
describe('DELETE /api/v1/books/category', () => {
  describe('When Invalid Entries are entered', () => {
    it('should return 400 Unsuccessful when no category Id is sent',
      (done) => {
        chai.request(app)
          .delete('/api/v1/books/category')
          .set('x-access-token', goodAdminToken)
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(400);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Incomplete details');
            done();
          });
      });
  });
  it('Should return 403 Unsuccessful for populated category', (done) => {
    chai.request(app)
      .delete('/api/v1/books/category')
      .set('x-access-token', goodAdminToken)
      .send({
        categoryId: 3
      })
      .end((error, response) => {
        should.exist(error);
        response.status.should.equal(403);
        response.type.should.equal('application/json');
        response.body.status.should.eql('Unsuccessful');
        response.body
          .message.should.eql('Cannot Delete Category, Remove Books From Category First');
        done();
      });
  });
  it('Should successfully delete category', (done) => {
    chai.request(app)
      .delete('/api/v1/books/category')
      .set('x-access-token', goodAdminToken)
      .send({
        categoryId: 1
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.equal(200);
        response.type.should.equal('application/json');
        response.body.status.should.eql('Success');
        response.body
          .message.should.eql('Category Deleted Successfully');
        response.body
          .deleted.should.eql(1);
        done();
      });
  });
});
describe('GET /api/v1/books/lists/categories', () => {
  it('should list all categories present', (done) => {
    chai.request(app)
      .get('/api/v1/books/lists/categories')
      .set('x-access-token', goodAdminToken)
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.equal(202);
        response.type.should.equal('application/json');
        response.body.status.should.eql('Success');
        should.exist(response.body.bookCategories);
        done();
      });
  });
});
