import chai from 'chai';
import chaiHttp from 'chai-http';
// import supertest from 'supertest';

import app from '../app';


// const app = require('../app');
// const chai = require('chai');
// const chaiHttp = require('chai-http');
const should = chai.should();


chai.use(chaiHttp);

describe('POST /api/v3/users/signup version 3', () => {
  before((done) => {
    chai.request(app).delete('/api/v2/users').end(done);
  });
  it('should respond with a 200 incomplete details', (done) => {
    chai.request(app)
      .post('/api/v3/users/signup')
      .send({
        firstname: 'Somebodyv3', // no username or password
        lastname: 'Elsev3',
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
  it('should respond with a 201 Created User on success (case insensitive)', (done) => {
    chai.request(app)
      .post('/api/v3/users/signup')
      .send({
        username: 'NoBoDy',
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
  it('should respond with a 201 Created User on success (case insensitive)', (done) => {
    chai.request(app)
      .post('/api/v3/users/signup')
      .send({
        username: 'somebodyElse',
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
      .post('/api/v3/users/signup')
      .send({
        username: 'somethingelse', // new username
        password: 'nobody_password',
        firstname: 'Somebody',
        lastname: 'Else',
        email: 'somebody@else.com', // email is same as before
        phone: '+234123456789',
      })
      .end((err, res) => {
        should.exist(err); // ensure errors
        res.status.should.equal(400);
        res.type.should.equal('application/json');
        res.body.status.should.eql('unsuccessful');
        res.body.errors[0].type.should.eql('unique violation');
        res.body.errors[0].message.should.eql('emailAddress must be unique');
        done();
      });
  });
  it('should respond with a 400 Unique violation', (done) => {
    chai.request(app)
      .post('/api/v3/users/signup')
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
        res.body.status.should.eql('unsuccessful');
        res.body.errors[0].type.should.eql('unique violation');
        res.body.errors[0].message.should.eql('username must be unique');
        done();
      });
  });
  it('should respond with a 400 Unique violation', (done) => {
    chai.request(app)
      .post('/api/v3/users/signup')
      .send({ // username and email same as before
        username: 'nobody',
        password: 'nobody_password',
        firstname: 'Somebody',
        lastname: 'Else',
        email: 'somebody@else.com',
        phone: '+234123456789',
      })
      .end((err, res) => {
        should.exist(err); // ensure errors
        res.status.should.equal(400);
        res.status.should.equal(400);
        res.type.should.equal('application/json');
        res.body.status.should.eql('unsuccessful');
        res.body.errors[0].type.should.eql('unique violation');
        res.body.errors[0].message.should.eql('emailAddress must be unique');
        done();
      });
  });
});
describe('POST /api/v3/users/signin version 3', () => {
  // incomplete details
  it('should respond with a 200 no username and password', (done) => {
    chai.request(app)
      .post('/api/v3/users/signin')
      .send({
        email: 'somebody@else.com',
      })
      .end((err, res) => {
        should.not.exist(err); // ensure errors
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('invalid');
        res.body.message.should.eql('no Username and password');
        done();
      });
  });
  it('should respond with a 200 no password', (done) => {
    chai.request(app)
      .post('/api/v3/users/signin')
      .send({
        username: 'nobody',
      })
      .end((err, res) => {
        should.not.exist(err); // ensure no errors
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('invalid');
        res.body.message.should.eql('no Password Specified');
        done();
      });
  });
  it('should respond with a 200 no username', (done) => {
    chai.request(app)
      .post('/api/v3/users/signin')
      .send({
        password: 'nobody_password',
      })
      .end((err, res) => {
        should.not.exist(err); // ensure no errors
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('invalid');
        res.body.message.should.eql('no Username/email Specified');
        done();
      });
  });
  // valid tests
  it('should respond with a 202 Success and details', (done) => {
    chai.request(app)
      .post('/api/v3/users/signin')
      .send({
        username: 'somebodyelse',
        password: 'somebodyGreatPassword',
      })
      .end((err, res) => {
        should.not.exist(err); // ensure no errors
        res.status.should.equal(202);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        res.body.data.Username.should.eql('somebodyelse');
        done();
      });
  });
  it('should respond with a 202 Success and details', (done) => {
    chai.request(app)
      .post('/api/v3/users/signin')
      .send({
        username: 'nobody',
        password: 'nobody_password',
      })
      .end((err, res) => {
        should.not.exist(err); // ensure no errors
        res.status.should.equal(202);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        res.body.data.Username.should.eql('nobody');
        done();
      });
  });
  it('should respond with a 202 Success and details (case insensitive username)', (done) => {
    chai.request(app)
      .post('/api/v3/users/signin')
      .send({
        username: 'NoBOdy',
        password: 'nobody_password',
      })
      .end((err, res) => {
        should.not.exist(err); // ensure no errors
        res.status.should.equal(202);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        res.body.data.Username.should.eql('nobody');
        done();
      });
  });
  // with email
  it('should respond with a 202 Success and details', (done) => {
    chai.request(app)
      .post('/api/v3/users/signin')
      .send({
        username: 'fidelis@thisemail.com',
        password: 'somebodyGreatPassword',
      })
      .end((err, res) => {
        should.not.exist(err); // ensure no errors
        res.status.should.equal(202);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        res.body.data.Username.should.eql('somebodyelse');
        done();
      });
  });
  it('should respond with a 202 Success and details', (done) => {
    chai.request(app)
      .post('/api/v3/users/signin')
      .send({
        username: 'somebody@else.com',
        password: 'nobody_password',
      })
      .end((err, res) => {
        should.not.exist(err); // ensure no errors
        res.status.should.equal(202);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        res.body.data.Username.should.eql('nobody');
        done();
      });
  });
  // errors
  it('should respond with a 200 invalid username', (done) => { // case sensitive
    chai.request(app)
      .post('/api/v3/users/signin')
      .send({
        username: 'wrong_user',
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
      .post('/api/v3/users/signin')
      .send({
        username: 'nobody',
        password: 'wrong_password',
      })
      .end((err, res) => {
        should.not.exist(err); // ensure no errors
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('invalid');
        res.body.message.should.eql('invalid user or password');
        done();
      });
  });
});
