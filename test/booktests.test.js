import chai from 'chai';
import chaiHttp from 'chai-http';
// import supertest from 'supertest';

import app from '../server';


// const app = require('../app');
// const chai = require('chai');
// const chaiHttp = require('chai-http');
const should = chai.should();


chai.use(chaiHttp);
describe('POST /api/v1/authors version 1', () => {
  before((done) => {
    chai.request(app).delete('/api/v1/books').end(done);
  });
  it('should respond with a 200 incomplete details', (done) => {
    chai.request(app)
      .post('/api/v1/authors')
      .send({
        authorFName: 'Armanda', // no Author Last name
      })
      .end((err, res) => {
        should.not.exist(err); // ensure errors
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('unsuccessful');
        res.body.message.should.eql('incomplete details');
        done();
      });
  });
  it('should respond with a 200 incomplete details', (done) => {
    chai.request(app)
      .post('/api/v1/authors')
      .send({
        authorLName: 'Righetti', // no Author First name
      })
      .end((err, res) => {
        should.not.exist(err); // ensure errors
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('unsuccessful');
        res.body.message.should.eql('incomplete details');
        done();
      });
  });
  it('should respond with a 201 success', (done) => {
    chai.request(app)
      .post('/api/v1/authors')
      .send({
        authorFName: 'George',
        authorLName: 'Martin',
        authorDOB: '1948-09-20',
      })
      .end((err, res) => {
        should.not.exist(err); // ensure errors
        res.status.should.equal(201);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        res.body.data.AuthorName.should.eql('George Martin');
        done();
      });
  });
  it('should respond with a 201 success', (done) => {
    chai.request(app)
      .post('/api/v1/authors')
      .send({
        authorFName: 'Joanne',
        authorLName: 'Rowling',
        authorDOB: '1965-07-31',
      })
      .end((err, res) => {
        should.not.exist(err); // ensure errors
        res.status.should.equal(201);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        res.body.data.AuthorName.should.eql('Joanne Rowling');
        done();
      });
  });
});

describe('POST /api/v1/books version 1 Create Books', () => {
  it('should respond with a 200 incomplete details', (done) => {
    chai.request(app)
      .post('/api/v1/books')
      .send({
        authorId: 1, // incomplete book details
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('unsuccessful');
        res.body.message.should.eql('incomplete Book Details!!');
        done();
      });
  });
  it('should respond with a 200 incomplete details', (done) => {
    chai.request(app)
      .post('/api/v1/books')
      .send({
        bookName: 'A Game of Thrones', // incomplete book details
        authorId: 1,
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('unsuccessful');
        res.body.message.should.eql('incomplete Book Details!!');
        done();
      });
  });
  it('should respond with a 201 success', (done) => {
    chai.request(app)
      .post('/api/v1/books')
      .send({
        bookName: 'A Game of Thrones',
        bookISBN: '0553103547',
        desc: 'A tail about the seven kingdoms',
        pubYear: '1996',
        authorId: 1,
      })
      .end((err, res) => {
        should.not.exist(err); // ensure errors
        res.status.should.equal(201);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        res.body.data.bookName.should.eql('A Game of Thrones');
        done();
      });
  });
  it('should respond with a 201 success', (done) => {
    chai.request(app)
      .post('/api/v1/books')
      .send({
        bookName: 'Harry Potter and the Prisoner of Azkaban',
        bookISBN: '0747542155',
        desc: 'Harry is back at the Dursleys, where he sees on Muggle television that a prisoner named Sirius Black has escaped',
        pubYear: '1999',
        authorId: 2,
      })
      .end((err, res) => {
        should.not.exist(err); // ensure errors
        res.status.should.equal(201);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        res.body.data.bookName.should.eql('Harry Potter and the Prisoner of Azkaban');
        done();
      });
  });
});
describe('put /api/v1/books version 1 Modify Books', () => {
  it('should respond with a 400 invalid book Id (number)', (done) => {
    chai.request(app)
      .put('/api/v1/books/a')
      .send({
        bookName: 'A Game of Thrones',
        bookISBN: '0553103547',
      })
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(400);
        res.type.should.equal('application/json');
        res.body.status.should.eql('none');
        res.body.message.should.eql('invalid number');
        done();
      });
  });
  it('should respond with a 200 invalid book Id', (done) => {
    chai.request(app)
      .put('/api/v1/books/9')
      .send({
        bookName: 'A Game of Thrones',
        bookISBN: '0553103547',
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('unsuccessful');
        res.body.message.should.eql('Book Id invalid');
        done();
      });
  });
  it('should respond with a 200 no information supplied', (done) => {
    chai.request(app)
      .put('/api/v1/books/1')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('invalid');
        res.body.message.should.eql('no information supplied');
        done();
      });
  });
  it('should respond with a 200 success', (done) => {
    chai.request(app)
      .put('/api/v1/books/1')
      .send({
        bookName: 'A Clash of Kings',
      })
      .end((err, res) => {
        should.not.exist(err); // ensure errors
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        res.body.message.should.eql('Book Details Updated');
        res.body.data.bookName.should.eql('A Clash of Kings');
        done();
      });
  });
  it('should respond with a 200 success', (done) => {
    chai.request(app)
      .put('/api/v1/books/1')
      .send({
        description: 'A tail about the seven kingdoms and all that',
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        res.body.message.should.eql('Book Details Updated');
        res.body.data.description.should.eql('A tail about the seven kingdoms and all that');
        done();
      });
  });
  it('should respond with a 200 success', (done) => {
    chai.request(app)
      .put('/api/v1/books/1')
      .send({
        bookName: 'A Clash of Kings 2',
        publishYear: '1998',
      })
      .end((err, res) => {
        should.not.exist(err); // ensure no errors
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        res.body.message.should.eql('Book Details Updated');
        res.body.data.bookName.should.eql('A Clash of Kings 2');
        res.body.data.publishYear.should.eql('1998-01-01T00:00:00.000Z');
        done();
      });
  });
  it('should respond with a 200 success', (done) => {
    chai.request(app)
      .put('/api/v1/books/2')
      .send({
        bookName: 'Harry Potter and the Chamber of Secrets',
      })
      .end((err, res) => {
        should.not.exist(err); // ensure no errors
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        res.body.message.should.eql('Book Details Updated');
        res.body.data.bookName.should.eql('Harry Potter and the Chamber of Secrets');
        done();
      });
  });
});
