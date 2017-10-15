import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';

import app from '../server';

const should = chai.should();

chai.use(chaiHttp);
chai.use(require('chai-things'));

const goodToken = jwt.sign({
  userId: 1,
  username: 'adminUser',
  firstName: 'admin',
  lastName: 'User',
  role: 'Admin',
}, app.settings.JsonSecret);
const nonAdminToken = jwt.sign({
  userId: 1,
  username: 'normalUser',
  firstName: 'norms',
  lastName: 'User',
  role: 'User',
}, app.settings.JsonSecret);
let bookId;

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
          .end((err, res) => {
            should.not.exist(err);// or not
            res.status.should.equal(201);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Success');
            res.body.message.should.eql('Author Created Successfully');
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
          .end((err, res) => {
            should.not.exist(err);// or not
            res.status.should.equal(201);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Success');
            res.body.message.should.eql('Author Created Successfully');
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
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(401);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Unsuccessful');
          res.body.message.should.eql('Not allowed');
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
            image: 'book-image.jpg',
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
          .end((err, res) => {
            should.exist(err);// or not
            res.status.should.equal(400);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message[0].error.should.eql('No Book Name Supplied');
            res.body.message[0].field.should.eql('bookname');
            done();
          });
      });
      it('should return 400 no ISBN', (done) => {
        chai.request(app)
          .post('/api/v4/books')
          .set('x-access-token', goodToken)
          .send({
            quantity: 1,
            image: 'book-image.jpg',
            publishyear: '1999',
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
          .end((err, res) => {
            should.exist(err);// or not
            res.status.should.equal(400);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message[0].error.should.eql('No ISBN Supplied');
            res.body.message[0].field.should.eql('ISBN');
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
          .end((err, res) => {
            should.exist(err);// or not
            res.status.should.equal(400);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message[0].field.should.eql('description');
            res.body.message[0].error.should.eql('No Description Supplied');
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
            .end((err, res) => {
              should.exist(err);// or not
              res.status.should.equal(400);
              res.type.should.equal('application/json');
              res.body.status.should.eql('Unsuccessful');
              res.body.message.should.all.have.property('error');
              res.body.message.should.all.have.property('field');
              res.body.message.should
                .contain.an.item.with.property('field', 'bookname');
              res.body.message.should
                .contain.an.item.with.property('field', 'ISBN');
              res.body.message.should
                .contain.an.item.with.property('field', 'description');
              res.body.message.should.contain.an
                .item.with.property('error', 'No Book Name Supplied');
              res.body.message.should
                .contain.an.item.with.property('error', 'No ISBN Supplied');
              res.body.message.should.contain.an
                .item.with.property('error', 'No Description Supplied');
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
            .end((err, res) => {
              should.exist(err);// or not
              res.status.should.equal(400);
              res.type.should.equal('application/json');
              res.body.status.should.eql('Unsuccessful');
              res.body.message.should
                .contain.an.item.with.property('field', 'authorField');
              res.body.message.should.contain.an
                .item.with.property('error', 'Invalid Authors');
              done();
            });
        });
        it('should return 400 Unsuccessful when no author supplied', (done) => {
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
            .end((err, res) => {
              should.exist(err);// or not
              res.status.should.equal(400);
              res.type.should.equal('application/json');
              res.body.status.should.eql('Unsuccessful');
              res.body.message.should
                .contain.an.item.with.property('field', 'authorField');
              res.body.message.should.contain.an
                .item.with.property('error', 'No Authors Selected');
              done();
            });
        });
        it('should return 400 Unsuccessful for non existent author', (done) => {
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
            .end((err, res) => {
              should.exist(err);// or not
              res.status.should.equal(400);
              res.type.should.equal('application/json');
              res.body.status.should.eql('Unsuccessful');
              res.body.message.should.eql('No Author found');
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
              guy to come along and accept its dares.`,
                authorIds: '5,4',
              })
              .end((err, res) => {
                should.exist(err);// or not
                res.status.should.equal(400);
                res.type.should.equal('application/json');
                res.body.status.should.eql('Unsuccessful');
                res.body.message.should.all.have.property('error');
                res.body.message.should.all.have.property('field');
                res.body.message.should
                  .contain.an.item.with.property('field', 'publishyear');
                res.body.message.should
                  .contain.an.item.with.property('error', 'Wrong Publish Year Supplied');
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
            .end((err, res) => {
              should.not.exist(err);// or not
              res.status.should.equal(201);
              res.type.should.equal('application/json');
              res.body.status.should.eql('Success');
              res.body.message.should.eql('Book Created Successfully');
              bookId = res.body.bookID;
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
              guy to come along and accept its dares.`,
              authorIds: '5,4',
            })
            .end((err, res) => {
              should.not.exist(err);// or not
              res.status.should.equal(201);
              res.type.should.equal('application/json');
              res.body.status.should.eql('Success');
              res.body.message.should.eql('Book Created Successfully');
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
              guy to come along and accept its dares.`,
                authorIds: '5,4',
              })
              .end((err, res) => {
                should.exist(err);// or not
                res.status.should.equal(400);
                res.type.should.equal('application/json');
                res.body.status.should.eql('Unsuccessful');
                res.body.message.should.eql('Book Already Exists');
                done();
              });
          });
        });
      });
    });
  });
});
describe('PUT /api/v4/books/:bookId version 4', () => {
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
          .end((err, res) => {
            should.exist(err);// or not
            res.status.should.equal(404);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('Invalid Book');
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
          .end((err, res) => {
            should.exist(err);
            res.status.should.equal(404);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('Invalid Book');
            done();
          });
      });
  });
  describe('When Valid Book Id is entered', () => {
    describe('When no information is provided', () => {
      it('should return 400 Unsuccessful when no info supplied',
        (done) => {
          chai.request(app)
            .put(`/api/v4/books/${bookId}`)
            .set('x-access-token', goodToken)
            .end((err, res) => {
              should.exist(err);// or not
              res.status.should.equal(400);
              res.type.should.equal('application/json');
              res.body.status.should.eql('Unsuccessful');
              res.body.message.should.eql('No Information Supplied');
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
            ISBN: '0-7475-5100-6',
          })
          .end((err, res) => {
            should.not.exist(err);// or not
            res.status.should.equal(200);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Success');
            res.body.message.should.eql('Book Details Updated');
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
            .end((err, res) => {
              should.not.exist(err);// or not
              res.status.should.equal(200);
              res.type.should.equal('application/json');
              res.body.status.should.eql('Success');
              res.body.message.should.eql('Book Details Updated');
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
            .end((err, res) => {
              should.not.exist(err);// or not
              res.status.should.equal(200);
              res.type.should.equal('application/json');
              res.body.status.should.eql('Success');
              res.body.message.should.eql('Book Details Updated');
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
              image: 'hpop.jpg',
            })
            .end((err, res) => {
              should.not.exist(err);// or not
              res.status.should.equal(200);
              res.type.should.equal('application/json');
              res.body.status.should.eql('Success');
              res.body.message.should.eql('Book Details Updated');
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
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(202);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Success');
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
describe('POST /api/v4/books/:bookId/quantity version 4', () => {
  describe('When invalid Details are presented', () => {
    it('should return 404 Invalid for invalid bookId character', (done) => {
      chai.request(app)
        .post('/api/v4/books/a/quantity')// a is wrong here
        .set('x-access-token', goodToken)
        .send({
          quantity: 3,
        })
        .end((err, res) => {
          should.exist(err);// or not
          res.status.should.equal(404);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Unsuccessful');
          res.body.message.should.eql('Invalid Book');
          done();
        });
    });
    it('should return 404 Invalid for invalid bookId', (done) => {
      chai.request(app)
        .post('/api/v4/books/209/quantity')// a is wrong here
        .set('x-access-token', goodToken)
        .send({
          quantity: 3,
        })
        .end((err, res) => {
          should.exist(err);// or not
          res.status.should.equal(404);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Unsuccessful');
          res.body.message.should.eql('Invalid Book');
          done();
        });
    });
  });
  describe('When Valid Details are presented', () => {
    it('should return 400 Missing Info for no quantity provided', (done) => {
      chai.request(app)
        .post(`/api/v4/books/${bookId}/quantity`)// a is wrong here
        .set('x-access-token', goodToken)
        .end((err, res) => {
          should.exist(err);// or not
          res.status.should.equal(400);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Unsuccessful');
          res.body.message.should.eql('Missing Information');
          done();
        });
    });
    it('should return 200 Successful', (done) => {
      chai.request(app)
        .post(`/api/v4/books/${bookId}/quantity`)// a is wrong here
        .set('x-access-token', goodToken)
        .send({
          quantity: 3,
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Success');
          res.body.message.should.eql('Book Updated Successfully');
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
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(202);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Success');
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
describe('GET /api/v4/search/authors?q=', () => {
  describe('When no details are provided', () => {
    it('should return 200 type Author details', (done) => {
      chai.request(app)
        .get('/api/v4/search/authors')
        .set('x-access-token', goodToken)
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('None');
          res.body.message.should.eql('Type Author details');
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
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.equal(200);
            res.type.should.equal('application/json');
            res.body.status.should.eql('None');
            res.body.message.should.eql('No Authors');
            done();
          });
      });
    it('should return 202 and author details',
      (done) => {
        chai.request(app)
          .get('/api/v4/search/authors?q=jo')
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
