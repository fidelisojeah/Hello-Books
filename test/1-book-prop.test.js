import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';

import app from '../server';
import {
  UserDetails
} from '../server/models';

const should = chai.should();

chai.use(chaiHttp);
chai.use(require('chai-things'));

let goodToken = '';
const nonAdminToken = jwt.sign({
  userId: 1,
  username: 'normalUser',
  firstName: 'norms',
  lastName: 'User',
  role: 'User',
}, app.settings.JsonSecret);
let bookId;

describe('Book Controller tests:', () => {
  before((done) => {
    UserDetails
      .create({
        firstname: 'Admin',
        lastname: 'AdminUser',
        emailaddress: 'adminuser@admin.com',
        username: 'adminuserusername',
        password: 'adminuserPassword',
        authString: 'randomString',
        isAdmin: true,
        isActivated: true
      }).then((response) => {
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
  describe('Before Population Tests', () => {
    describe('GET /api/v4/books', () => {
      describe('When no book is in database', () => {
        it('should return 200 No Books', (done) => {
          chai.request(app)
            .get('/api/v4/books')
            .set('x-access-token', goodToken)
            .end((error, response) => {
              should.not.exist(error);
              response.status.should.equal(200);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('No Books');
              done();
            });
        });
      });
    });
  });
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
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(400);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('Incomplete details');
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
            .end((error, response) => {
              should.not.exist(error);
              response.status.should.equal(201);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Success');
              response.body.message.should.eql('Author Created Successfully');
              done();
            });
        });
        it('should return 201 success', (done) => {
          chai.request(app)
            .post('/api/v4/authors')
            .set('x-access-token', goodToken)
            .send({
              firstname: 'George',
              lastname: 'Martin',
              authorAKA: 'George R.R Martin',
              authorDOB: '1948-09-20',
            })
            .end((error, response) => {
              should.not.exist(error);
              response.status.should.equal(201);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Success');
              response.body.message.should.eql('Author Created Successfully');
              done();
            });
        });
        it('should return 201 success', (done) => {
          chai.request(app)
            .post('/api/v4/authors')
            .set('x-access-token', goodToken)
            .send({
              firstname: 'Rachel',
              lastname: 'Cohn',
              authorAKA: 'Rachel Cohn',
              authorDOB: '1968-12-14',
            })
            .end((error, response) => {
              should.not.exist(error);
              response.status.should.equal(201);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Success');
              response.body.message.should.eql('Author Created Successfully');
              done();
            });
        });
        it('should return 201 success', (done) => {
          chai.request(app)
            .post('/api/v4/authors')
            .set('x-access-token', goodToken)
            .send({
              firstname: 'David',
              lastname: 'Levithan',
              authorAKA: 'David Levithan',
              authorDOB: '1972-09-07',
            })
            .end((error, response) => {
              should.not.exist(error);
              response.status.should.equal(201);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Success');
              response.body.message.should.eql('Author Created Successfully');
              done();
            });
        });
        it('should return 201 success', (done) => {
          chai.request(app)
            .post('/api/v4/authors')
            .set('x-access-token', goodToken)
            .send({
              firstname: 'Benny',
              lastname: 'Ogidan',
              authorAKA: 'Benny O.',
            })
            .end((error, response) => {
              should.not.exist(error);
              response.status.should.equal(201);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Success');
              response.body.message.should.eql('Author Created Successfully');
              done();
            });
        });
      });
    });
  });
  describe('POST /api/v4/books version 4', () => {
    describe('When non admin token is provided', () => {
      it('Should return a 401 error', (done) => {
        chai.request(app)
          .post('/api/v4/books')
          .set('x-access-token', nonAdminToken)
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
            response.status.should.equal(401);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Not allowed');
            done();
          });
      });
    });
    describe('When a valid admin token is provided', () => {
      describe('When other information is incomplete', () => {
        it('should return 400 no book name', (done) => {
          chai.request(app)
            .post('/api/v4/books')
            .set('x-access-token', goodToken)
            .send({
              quantity: 1,
              publishyear: '1999',
              // bookname: 'Harry Potter and the Prisoner of Azkaban',
              ISBN: '0-7475-4215-5',
              desccription: `Harry is back at the Dursleys, 
              where he sees on Muggle television that a 
              prisoner named Sirius Black has escaped. 
              Harry involuntarily inflates Aunt Marge 
              when she comes to visit after she insults 
              Harry and his parents.`,
              authorIds: '2',
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(400);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response
                .body.message[0]
                .error.should.eql('No Book Name Supplied');
              response.body.message[0].field.should.eql('bookname');
              done();
            });
        });
        it('should return 400 no ISBN', (done) => {
          chai.request(app)
            .post('/api/v4/books')
            .set('x-access-token', goodToken)
            .send({
              image: 'book-image.jpg',
              bookname: 'Harry Potter and the Prisoner of Azkaban',
              //  ISBN: '0-7475-4215-5',
              desccription: `Harry is back at the Dursleys, 
              where he sees on Muggle television that a 
              prisoner named Sirius Black has escaped. 
              Harry involuntarily inflates Aunt Marge 
              when she comes to visit after she insults 
              Harry and his parents.`,
              authorIds: '2',
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(400);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message[0].error.should.eql('No ISBN Supplied');
              response.body.message[0].field.should.eql('ISBN');
              done();
            });
        });
        it('should return 400 no Description', (done) => {
          chai.request(app)
            .post('/api/v4/books')
            .set('x-access-token', goodToken)
            .send({
              quantity: 1,
              image: 'book-image.jpg',
              publishyear: '1999',
              bookname: 'Harry Potter and the Prisoner of Azkaban',
              ISBN: '0-7475-4215-5',
              authorIds: '2',
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(400);
              response.type.should.equal('application/json');
              response.body
                .status.should.eql('Unsuccessful');
              response.body
                .message[0].field.should.eql('description');
              response.body
                .message[0].error
                .should.eql('No Description Supplied');
              done();
            });
        });
        it('should return 400 and error when multiple info is missing',
          (done) => {
            chai.request(app)
              .post('/api/v4/books')
              .set('x-access-token', goodToken)
              .send({
                quantity: 1,
                image: 'book-image.jpg',
                publishyear: '1999',
                authorIds: '2',
              })
              .end((error, response) => {
                should.exist(error);
                response.status.should.equal(400);
                response.type.should.equal('application/json');
                response.body.status.should.eql('Unsuccessful');
                response.body
                  .message.should.all.have.property('error');
                response.body
                  .message.should.all.have.property('field');
                response.body
                  .message.should
                  .contain.an.item.with.property('field', 'bookname');
                response.body.message.should
                  .contain.an.item.with.property('field', 'ISBN');
                response.body.message.should
                  .contain.an.item
                  .with.property('field', 'description');
                response.body.message.should.contain.an
                  .item.with
                  .property('error', 'No Book Name Supplied');
                response.body.message.should
                  .contain.an.item
                  .with.property('error', 'No ISBN Supplied');
                response.body.message.should.contain.an
                  .item.with
                  .property('error', 'No Description Supplied');
                done();
              });
          });
      });
      describe('When Complete information is provided', () => {
        describe('When Author Information is invalid', () => {
          it('should return 400 Unsuccessful for invalid author', (done) => {
            chai.request(app)
              .post('/api/v4/books')
              .set('x-access-token', goodToken)
              .send({
                quantity: 1,
                image: 'default.jpg',
                publishyear: '1900',
                bookname: 'Some book name here',
                ISBN: '10293716810',
                description: 'A wrong book but who cares',
                authorIds: 'fake', // not a number
              })
              .end((error, response) => {
                should.exist(error);
                response.status.should.equal(400);
                response.type.should.equal('application/json');
                response.body.status.should.eql('Unsuccessful');
                response.body.message.should
                  .contain.an.item.with.property('field', 'authorField');
                response.body.message.should.contain.an
                  .item.with.property('error', 'Invalid Authors');
                done();
              });
          });
          it(`should return 400 
          Unsuccessful when no author supplied`,
            (done) => {
              chai.request(app)
                .post('/api/v4/books')
                .set('x-access-token', goodToken)
                .send({
                  quantity: 1,
                  image: 'default.jpg',
                  publishyear: '1900',
                  bookname: 'Some book name here',
                  ISBN: '10293716810',
                  description: 'A wrong book but who cares'
                })
                .end((error, response) => {
                  should.exist(error);
                  response.status.should.equal(400);
                  response.type.should.equal('application/json');
                  response.body.status.should.eql('Unsuccessful');
                  response.body.message.should
                    .contain.an.item.with.property('field', 'authorField');
                  response.body.message.should.contain.an
                    .item.with.property('error', 'No Authors Selected');
                  done();
                });
            });
          it(`should return 400 
          Unsuccessful for non existent author`,
            (done) => {
              chai.request(app)
                .post('/api/v4/books')
                .set('x-access-token', goodToken)
                .send({
                  quantity: 1,
                  image: 'default.jpg',
                  publishyear: '1900',
                  bookname: 'Some book name here',
                  ISBN: '10293716810',
                  description: 'A wrong book but who cares',
                  authorIds: '999',
                })
                .end((error, response) => {
                  should.exist(error);
                  response.status.should.equal(400);
                  response.type.should.equal('application/json');
                  response.body.status.should.eql('Unsuccessful');
                  response.body.message.should.eql('No Author found');
                  done();
                });
            });
        });
        describe('When Publish Year is Invalid', () => {
          it('should return 400 and error when Publish year is invalid',
            (done) => {
              chai.request(app)
                .post('/api/v4/books')
                .set('x-access-token', goodToken)
                .send({
                  quantity: 1,
                  image: 'book-image.jpg',
                  publishyear: 'a869',
                  bookname: 'Dash & Lily\'s Book of Dares',
                  ISBN: '1742374662',
                  description: `So begins the latest whirlwind 
              romance from the bestselling authors of Nick & 
              Norah’s Infinite Playlist. Lily has left a red 
              notebook full of challenges on a favorite 
              bookstore shelf, waiting for just the right 
              guy to come along and accept its daresponse.`,
                  authorIds: '5,4',
                })
                .end((error, response) => {
                  should.exist(error);
                  response.status.should.equal(400);
                  response.type.should.equal('application/json');
                  response.body.status.should.eql('Unsuccessful');
                  response.body.message.should.all.have.property('error');
                  response.body.message.should.all.have.property('field');
                  response.body.message.should
                    .contain.an.item.with.property('field', 'publishyear');
                  response.body.message.should.contain.an.item.with
                    .property('error', 'Wrong Publish Year Supplied');
                  done();
                });
            });
        });
        describe('When valid information is provided', () => {
          it('should return 201 Book Created', (done) => {
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
                should.not.exist(error);
                response.status.should.equal(201);
                response.type.should.equal('application/json');
                response.body.status.should.eql('Success');
                response.body.message.should.eql('Book Created Successfully');
                bookId = response.body.bookID;
                done();
              });
          });
          it('should return 201 Book Created', (done) => {
            chai.request(app)
              .post('/api/v4/books')
              .set('x-access-token', goodToken)
              .send({
                quantity: 1,
                image: 'hppa.jpg',
                publishyear: '2001',
                bookname: 'Harry Potter and the Chambers of Secrets',
                ISBN: '0-7475-0100-5',
                description: `Harry is back at the Dursleys, 
              where he sees on Muggle television that a 
              prisoner named Sirius Black has escaped. 
              Harry involuntarily inflates Aunt Marge 
              when she comes to visit after she insults 
              Harry and his parents.`,
                authorIds: '2',
              })
              .end((error, response) => {
                should.not.exist(error);
                response.status.should.equal(201);
                response.type.should.equal('application/json');
                response.body.status.should.eql('Success');
                response.body.message.should.eql('Book Created Successfully');
                bookId = response.body.bookID;
                done();
              });
          });
          it('should return 201 Book Created', (done) => {
            chai.request(app)
              .post('/api/v4/books')
              .set('x-access-token', goodToken)
              .send({
                quantity: 2,
                image: 'hppa.jpg',
                publishyear: '2010',
                bookname: 'Harry Potter and the Half Blood Prince',
                ISBN: '0-7475-0090-3',
                description: `Harry is back at the Dursleys, 
              where he sees on Muggle television that a 
              prisoner named Sirius Black has escaped. 
              Harry involuntarily inflates Aunt Marge 
              when she comes to visit after she insults 
              Harry and his parents.`,
                authorIds: '2',
              })
              .end((error, response) => {
                should.not.exist(error);
                response.status.should.equal(201);
                response.type.should.equal('application/json');
                response.body.status.should.eql('Success');
                response.body.message.should.eql('Book Created Successfully');
                bookId = response.body.bookID;
                done();
              });
          });
          it('should return 201 Book Created for multiple authors', (done) => {
            chai.request(app)
              .post('/api/v4/books')
              .set('x-access-token', goodToken)
              .send({
                quantity: 1,
                image: 'Dash-lilly.jpg',
                publishyear: '2010',
                bookname: 'Dash & Lily\'s Book of Dares',
                ISBN: '1742374662',
                description: `So begins the latest whirlwind 
              romance from the bestselling authors of Nick & 
              Norah’s Infinite Playlist. Lily has left a red 
              notebook full of challenges on a favorite 
              bookstore shelf, waiting for just the right 
              guy to come along and accept its daresponse.`,
                authorIds: '5,4',
              })
              .end((error, response) => {
                should.not.exist(error);
                response.status.should.equal(201);
                response.type.should.equal('application/json');
                response.body.status.should.eql('Success');
                response.body.message.should.eql('Book Created Successfully');
                done();
              });
          });
          describe('When duplicate information is added', () => {
            it('should return 400 Info', (done) => {
              chai.request(app)
                .post('/api/v4/books')
                .set('x-access-token', goodToken)
                .send({
                  quantity: 1,
                  image: 'Dash-lilly.jpg',
                  publishyear: '2010',
                  bookname: 'Dash & Lily\'s Book of Dares',
                  ISBN: '1742374662', // same ISBN
                  description: `So begins the latest whirlwind 
              romance from the bestselling authors of Nick & 
              Norah’s Infinite Playlist. Lily has left a red 
              notebook full of challenges on a favorite 
              bookstore shelf, waiting for just the right 
              guy to come along and accept its daresponse.`,
                  authorIds: '5,4',
                })
                .end((error, response) => {
                  should.exist(error);
                  response.status.should.equal(400);
                  response.type.should.equal('application/json');
                  response.body.status.should.eql('Unsuccessful');
                  response.body.message.should.eql('Book Already Exists');
                  done();
                });
            });
          });
        });
      });
    });
  });
  describe('PUT /api/v4/books/:bookId version 4', () => {
    describe('When non admin token is provided', () => {
      it('Should return a 401 error', (done) => {
        chai.request(app)
          .put(`/api/v4/books/${bookId}`)
          .set('x-access-token', nonAdminToken)
          .send({
            bookISBN: '0-7405-8100-5',
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
    describe('When Invalid Book Id is entered', () => {
      it('should return 404 Unsuccessful for wrong Book Id type',
        (done) => {
          chai.request(app)
            .put('/api/v4/books/a')
            .set('x-access-token', goodToken)
            .send({
              bookname: 'Harry Potter and the Order of the Phoenix',
              ISBN: '0-7475-5100-6',
              description: `During another summer with his Aunt 
          Petunia and Uncle Vernon, Harry Potter and Dudley 
          are attacked by Dementors. After using magic to 
          save Dudley and himself, Harry is expelled from 
          Hogwarts, but the decision is later rescinded.`,
              publishYear: '2000',
              image: 'hpop.jpg',
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(404);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('Invalid Book');
              done();
            });
        });
      it('should return 404 Unsuccessful for wrong Book Id',
        (done) => {
          chai.request(app)
            .put('/api/v4/books/102')
            .set('x-access-token', goodToken)
            .send({
              bookname: 'Harry Potter and the Order of the Phoenix',
              ISBN: '0-7475-5100-6',
              description: `During another summer with his Aunt 
          Petunia and Uncle Vernon, Harry Potter and Dudley 
          are attacked by Dementors. After using magic to 
          save Dudley and himself, Harry is expelled from 
          Hogwarts, but the decision is later rescinded.`,
              publishYear: '2000',
              image: 'hpop.jpg',
            })
            .end((error, response) => {
              should.exist(error);
              response.status.should.equal(404);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Unsuccessful');
              response.body.message.should.eql('Invalid Book');
              done();
            });
        });
    });
    describe('When Valid Book Id is entered', () => {
      describe('When duplicate information is provided', () => {
        it('should return 400 Unsuccessful when ISBN already used',
          (done) => {
            chai.request(app)
              .put(`/api/v4/books/${bookId}`)
              .send({
                bookISBN: '1742374662',
              })
              .set('x-access-token', goodToken)
              .end((error, response) => {
                should.exist(error);
                response.status.should.equal(400);
                response.type.should.equal('application/json');
                response.body.status.should.eql('Unsuccessful');
                response.body.error.should.eql('bookISBN must be unique');
                done();
              });
          });
      });
      describe('When no information is provided', () => {
        it('should return 400 Unsuccessful when no info supplied',
          (done) => {
            chai.request(app)
              .put(`/api/v4/books/${bookId}`)
              .set('x-access-token', goodToken)
              .end((error, response) => {
                should.exist(error);
                response.status.should.equal(400);
                response.type.should.equal('application/json');
                response.body.status.should.eql('Unsuccessful');
                response.body.message.should.eql('No Information Supplied');
                done();
              });
          });
      });
      describe('When Information is provided', () => {
        it('should return 200 Success when ISBN changed', (done) => {
          chai.request(app)
            .put(`/api/v4/books/${bookId}`)
            .set('x-access-token', goodToken)
            .send({
              bookISBN: '0-7405-8100-5',
            })
            .end((error, response) => {
              should.not.exist(error);
              response.status.should.equal(200);
              response.type.should.equal('application/json');
              response.body.status.should.eql('Success');
              response.body.message.should.eql('Book Details Updated');
              done();
            });
        });
        it('should return 200 Success when published year is changed',
          (done) => {
            chai.request(app)
              .put(`/api/v4/books/${bookId}`)
              .set('x-access-token', goodToken)
              .send({
                publishYear: '2000',
              })
              .end((error, response) => {
                should.not.exist(error);
                response.status.should.equal(200);
                response.type.should.equal('application/json');
                response.body.status.should.eql('Success');
                response.body.message.should.eql('Book Details Updated');
                done();
              });
          });
        it('should return 200 Success when book Description is changed',
          (done) => {
            chai.request(app)
              .put(`/api/v4/books/${bookId}`)
              .set('x-access-token', goodToken)
              .send({
                description: `During another summer with his Aunt 
           Petunia and Uncle Vernon, Harry Potter and Dudley 
           are attacked by Dementors. After using magic to 
           save Dudley and himself, Harry is expelled from 
           Hogwarts, but the decision is later rescinded.`,
              })
              .end((error, response) => {
                should.not.exist(error);
                response.status.should.equal(200);
                response.type.should.equal('application/json');
                response.body.status.should.eql('Success');
                response.body.message.should.eql('Book Details Updated');
                done();
              });
          });
        describe('When multiple information is provided', () => {
          it('should return 200 Success when book name is changed', (done) => {
            chai.request(app)
              .put(`/api/v4/books/${bookId}`)
              .set('x-access-token', goodToken)
              .send({
                bookname: 'Harry Potter and the Order of the Phoenix',
                bookImage: 'hpop.jpg',
              })
              .end((error, response) => {
                should.not.exist(error);
                response.status.should.equal(200);
                response.type.should.equal('application/json');
                response.body.status.should.eql('Success');
                response.body.message.should.eql('Book Details Updated');
                done();
              });
          });
        });
      });
    });
  });
  describe('GET /api/v4/books version 4', () => {
    describe('When no book ID is provided (get all books)', () => {
      it('should return 202 and list all books', (done) => {
        chai.request(app)
          .get('/api/v4/books')
          .set('x-access-token', goodToken)
          .end((error, response) => {
            should.not.exist(error);
            response.status.should.equal(202);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Success');
            done();
          });
      });
    });
    describe('When book ID is provided (get book and author info)', () => {
      it('should return 202 and info about the Book', (done) => {
        chai.request(app)
          .get('/api/v4/books')
          .set('x-access-token', goodToken)
          .query({
            id: 1,
          })
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
  describe('POST /api/v4/books/:bookId/quantity version 4', () => {
    describe('When non admin token is provided', () => {
      it('Should return a 401 error', (done) => {
        chai.request(app)
          .post(`/api/v4/books/${bookId}/quantity`)
          .set('x-access-token', nonAdminToken)
          .send({
            quantity: 3,
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
    describe('When invalid Details are presented', () => {
      it('should return 404 Invalid for invalid bookId character', (done) => {
        chai.request(app)
          .post('/api/v4/books/a/quantity')
          .set('x-access-token', goodToken)
          .send({
            quantity: 3,
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(404);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Invalid Book');
            done();
          });
      });
      it('should return 404 Invalid for invalid bookId', (done) => {
        chai.request(app)
          .post('/api/v4/books/209/quantity')
          .set('x-access-token', goodToken)
          .send({
            quantity: 3,
          })
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(404);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Invalid Book');
            done();
          });
      });
    });
    describe('When Valid Details are presented', () => {
      it('should return 400 Missing Info for no quantity provided', (done) => {
        chai.request(app)
          .post(`/api/v4/books/${bookId}/quantity`)
          .set('x-access-token', goodToken)
          .end((error, response) => {
            should.exist(error);
            response.status.should.equal(400);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Unsuccessful');
            response.body.message.should.eql('Missing Information');
            done();
          });
      });
      it('should return 200 Successful', (done) => {
        chai.request(app)
          .post(`/api/v4/books/${bookId}/quantity`)
          .set('x-access-token', goodToken)
          .send({
            quantity: -9,
          })
          .end((error, response) => {
            should.not.exist(error);
            response.status.should.equal(200);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Success');
            response.body.message.should.eql('Book Updated Successfully');
            done();
          });
      });
      it('should return 200 Successful', (done) => {
        chai.request(app)
          .post(`/api/v4/books/${bookId}/quantity`)
          .set('x-access-token', goodToken)
          .send({
            quantity: 3,
          })
          .end((error, response) => {
            should.not.exist(error);
            response.status.should.equal(200);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Success');
            response.body.message.should.eql('Book Updated Successfully');
            done();
          });
      });
    });
  });
  describe('GET /api/v4/authors version 4', () => {
    describe('When no author ID is provided (get all authors)', () => {
      it('should return 202 and list all authors', (done) => {
        chai.request(app)
          .get('/api/v4/authors')
          .set('x-access-token', goodToken)
          .end((error, response) => {
            should.not.exist(error);
            response.status.should.equal(202);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Success');
            done();
          });
      });
    });
    describe('When author ID is provided get author and books', () => {
      it('should return 202 and info about the author', (done) => {
        chai.request(app)
          .get('/api/v4/authors')
          .query({
            id: 1,
          })
          .set('x-access-token', goodToken)
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
  describe('GET /api/v4/search/authors?q=', () => {
    describe('When no details are provided', () => {
      it('should return 200 type Author details', (done) => {
        chai.request(app)
          .get('/api/v4/search/authors')
          .set('x-access-token', goodToken)
          .end((error, response) => {
            should.not.exist(error);
            response.status.should.equal(200);
            response.type.should.equal('application/json');
            response.body.status.should.eql('None');
            response.body.message.should.eql('Type Author details');
            done();
          });
      });
    });
    describe('When Details are entered', () => {
      it('should return 200 NO Author found when no author exists',
        (done) => {
          chai.request(app)
            .get('/api/v4/search/authors?q=gegegegegegegeg')
            .set('x-access-token', goodToken)
            .end((error, response) => {
              should.not.exist(error);
              response.status.should.equal(200);
              response.type.should.equal('application/json');
              response.body.status.should.eql('None');
              response.body.message.should.eql('No Authors');
              done();
            });
        });
      it('should return 202 and author details',
        (done) => {
          chai.request(app)
            .get('/api/v4/search/authors?q=jo')
            .set('x-access-token', goodToken)
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
  describe('GET /api/v4/books/list/:page version 4', () => {
    describe('when incomplete details are passed in', () => {
      it('should return a 400 when invalid page is sent', (done) => {
        chai.request(app)
          .get('/api/v4/books/list/invalidNumber?limit=0')
          .set('x-access-token', goodToken)
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
      it('should return a 400 when page is less than 1', (done) => {
        chai.request(app)
          .get('/api/v4/books/list/0?limit=0')
          .set('x-access-token', goodToken)
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
      it('should return a 400 when no limit is sent', (done) => {
        chai.request(app)
          .get('/api/v4/books/list/1')
          .set('x-access-token', goodToken)
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
          .get('/api/v4/books/list/1?limit=-10')
          .set('x-access-token', goodToken)
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
      it('should return 400 when multiple details are invalid', (done) => {
        chai.request(app)
          .get('/api/v4/books/list/invalid?limit=invalid')
          .set('x-access-token', goodToken)
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
    describe('when Complete details are passed in', () => {
      it('should return a 200 with information', (done) => {
        chai.request(app)
          .get('/api/v4/books/list/1?limit=10')
          .set('x-access-token', goodToken)
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
          .get('/api/v4/books/list/1?limit=10&sort=rating')
          .set('x-access-token', goodToken)
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
          .get('/api/v4/books/list/1?limit=10&sort=alphabetical')
          .set('x-access-token', goodToken)
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
  describe('GET /api/v1/sorted/books version 4', () => {
    describe('when Complete details are passed in', () => {
      it('should return a 200 with information', (done) => {
        chai.request(app)
          .get('/api/v1/sorted/books')
          .set('x-access-token', goodToken)
          .end((error, response) => {
            should.not.exist(error);
            response.status.should.equal(202);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Success');
            response.body
              .message.should.eql('List retrieved Successfully');
            response.body.ratedBooks
              .should.all.have.property('id');
            response.body.ratedBooks
              .should.all.have.property('bookName');
            response.body.ratedBooks
              .should.all.have.property('description');
            response.body.ratedBooks
              .should.all.have.property('bookImage');
            response.body.ratedBooks
              .should.all.have.property('publishYear');
            response.body.ratedBooks
              .should.all.have.property('RatingCount');
            response.body.ratedBooks
              .should.all.have.property('RatingSum');
            response.body.ratedBooks
              .should.all.have.property('RatingAvg');
            response.body.byLendingBooks
              .should.all.have.property('id');
            response.body.byLendingBooks
              .should.all.have.property('bookName');
            response.body.byLendingBooks
              .should.all.have.property('description');
            response.body.byLendingBooks
              .should.all.have.property('bookImage');
            response.body.byLendingBooks
              .should.all.have.property('publishYear');
            response.body.byLendingBooks
              .should.all.have.property('RatingCount');
            response.body.byLendingBooks
              .should.all.have.property('RatingSum');
            response.body.byLendingBooks
              .should.all.have.property('RatingAvg');
            response.body.byLendingBooks
              .should.all.have.property('LendingCount');
            done();
          });
      });
    });
  });
});
