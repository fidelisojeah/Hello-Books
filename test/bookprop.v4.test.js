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
            res.body.message.should.eql('No Book Name Supplied');
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
            res.body.message.should.eql('No ISBN Supplied');
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
            ISBN: '0-7475-4215-5',
            authorIds: '2',
          })
          .end((err, res) => {
            should.exist(err);// or not
            res.status.should.equal(400);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Unsuccessful');
            res.body.message.should.eql('No Description Supplied');
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
              desccription: 'A wrong book but who cares',
              authorIds: 'fake', // not a number
            })
            .end((err, res) => {
              should.exist(err);// or not
              res.status.should.equal(400);
              res.type.should.equal('application/json');
              res.body.status.should.eql('Unsuccessful');
              res.body.message.should.eql('Invalid Authors');
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
