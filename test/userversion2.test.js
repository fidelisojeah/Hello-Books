import chai from 'chai';
import chaiHttp from 'chai-http';
// import supertest from 'supertest';

import app from '../server';


// const app = require('../app');
// const chai = require('chai');
// const chaiHttp = require('chai-http');
const should = chai.should();


chai.use(chaiHttp);

before((done) => {
  chai.request(app).delete('/api/v2/users').end(done);
});

describe('POST /api/v2/users/signup version 2', () => {
  it('should respond with a 200 incomplete details', (done) => {
    chai.request(app)
      .post('/api/v2/users/signup')
      .send({
        firstname: 'Somebody', // no username or password
        lastname: 'Else',
        email: 'somebody@else.com',
      })
      .end((err, res) => {
        should.not.exist(err); // ensure errors
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('unsuccessful');
        res.body.error.should.eql('incomplete details');
        done();
      });
  });
  it('should respond with a 201 Created User on success', (done) => {
    chai.request(app)
      .post('/api/v2/users/signup')
      .send({
        username: 'nobody',
        password: 'nobody_password',
        firstname: 'Somebody',
        lastname: 'Else',
        email: 'somebody@else.com',
        phone: '+234123456789',
      })
      .end((err, res) => {
        should.not.exist(err); // ensure no errors
        res.status.should.equal(201);
        res.type.should.equal('application/json');
        res.body.status.should.eql('User Created');
        res.body.data.username.should.eql('nobody');
        res.body.data.Membership.should.eql('Blue');
        done();
      });
  });
  it('should respond with a 201 Created User on success', (done) => {
    chai.request(app)
      .post('/api/v2/users/signup')
      .send({
        username: 'somebodyelse',
        password: 'somebodyGreatPassword',
        firstname: 'Somebody',
        lastname: 'Really',
        email: 'fidelis@thisemail.com',
        phone: '+23456789101112',
      })
      .end((err, res) => {
        should.not.exist(err); // ensure no errors
        res.status.should.equal(201);
        res.type.should.equal('application/json');
        res.body.status.should.eql('User Created');
        res.body.data.username.should.eql('somebodyelse');
        res.body.data.Membership.should.eql('Blue');
        done();
      });
  });
  // errors
  it('should respond with a 400 Unique violation', (done) => {
    chai.request(app)
      .post('/api/v2/users/signup')
      .send({
        username: 'somethingelse',
        password: 'nobody_password',
        firstname: 'Somebody',
        lastname: 'Else',
        email: 'somebody@else.com', // email is same as before
        phone: '+234123456789',
      })
      .end((err, res) => {
        should.exist(err); // ensure no errors
        res.status.should.equal(400);
        res.type.should.equal('application/json');
        done();
      });
  });
  it('should respond with a 400 Unique violation', (done) => {
    chai.request(app)
      .post('/api/v2/users/signup')
      .send({
        username: 'nobody', // username is same as already created
        password: 'nobody_pasord',
        firstname: 'Somebody',
        lastname: 'Else',
        email: 'somebody@lse.com',
        phone: '+234123456789',
      })
      .end((err, res) => {
        should.exist(err); // errors present
        res.status.should.equal(400);
        res.type.should.equal('application/json');
        done();
      });
  });
  it('should respond with a 400 Unique violation', (done) => {
    chai.request(app)
      .post('/api/v2/users/signup')
      .send({ // username and email same as before
        username: 'nobody',
        password: 'nobody_password',
        firstname: 'Somebody',
        lastname: 'Else',
        email: 'somebody@else.com',
        phone: '+234123456789',
      })
      .end((err, res) => {
        should.exist(err); // ensure no errors
        res.status.should.equal(400);
        res.type.should.equal('application/json');
        done();
      });
  });
});
describe('POST /api/v2/users/signin version 2', () => {
  // incomplete details
  it('should respond with a 200 no username and password', (done) => {
    chai.request(app)
      .post('/api/v2/users/signin')
      .send({
        email: 'somebody@else.com',
      })
      .end((err, res) => {
        should.not.exist(err); // ensure errors
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('no Username and password');
        done();
      });
  });
  it('should respond with a 200 no password', (done) => {
    chai.request(app)
      .post('/api/v2/users/signin')
      .send({
        username: 'nobody',
      })
      .end((err, res) => {
        should.not.exist(err); // ensure no errors
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('no Password');
        done();
      });
  });
  it('should respond with a 200 no username', (done) => {
    chai.request(app)
      .post('/api/v2/users/signin')
      .send({
        password: 'nobody_password',
      })
      .end((err, res) => {
        should.not.exist(err); // ensure no errors
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('no Username');
        done();
      });
  });
  // valid tests
  it('should respond with a 202 Success and details', (done) => {
    chai.request(app)
      .post('/api/v2/users/signin')
      .send({
        username: 'somebodyelse',
        password: 'somebodyGreatPassword',
      })
      .end((err, res) => {
        should.not.exist(err); // ensure no errors
        res.status.should.equal(202);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        res.body.data.username.should.eql('somebodyelse');
        done();
      });
  });
  it('should respond with a 202 Success and details', (done) => {
    chai.request(app)
      .post('/api/v2/users/signin')
      .send({
        username: 'nobody',
        password: 'nobody_password',
      })
      .end((err, res) => {
        should.not.exist(err); // ensure no errors
        res.status.should.equal(202);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        res.body.data.username.should.eql('nobody');
        done();
      });
  });
  // errors
  it('should respond with a 200 invalid username (case sensitive)', (done) => { // case sensitive
    chai.request(app)
      .post('/api/v2/users/signin')
      .send({
        username: 'NoBoDy',
        password: 'nobody_password',
      })
      .end((err, res) => {
        should.not.exist(err); // ensure no errors
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('invalid user');
        done();
      });
  });
  it('should respond with a 200 invalid username (does not accept email)', (done) => { // case sensitive
    chai.request(app)
      .post('/api/v2/users/signin')
      .send({
        username: 'somebody@else.com',
        password: 'nobody_password',
      })
      .end((err, res) => {
        should.not.exist(err); // ensure no errors
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('invalid user');
        done();
      });
  });
  it('should respond with a 200 invalid username or password', (done) => { // case sensitive
    chai.request(app)
      .post('/api/v2/users/signin')
      .send({
        username: 'nobody',
        password: 'wrong_password',
      })
      .end((err, res) => {
        should.not.exist(err); // ensure no errors
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('invalid user or password');
        done();
      });
  });
});
