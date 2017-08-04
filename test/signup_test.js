const app = require('../app');
// const request = require('supertest');
const chai = require('chai');

const should = chai.should();
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('POST /api/v1/users/signup', () => {
  beforeEach((done) => {
    chai.request(app).delete('/api/v1/users').end(done);
  });

  it('should respond with a 400 incomplete details', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        // no username or password
        firstname: 'Somebody',
        lastname: 'Else',
        email: 'somebody@else.com',
      })
      .end((err, res) => {
        should.exist(err); // ensure no errors
        res.status.should.equal(400);
        res.type.should.equal('application/json');
        res.body.status.should.eql('unsuccessful');
        res.body.error.should.eql('incomplete details');
        done();
      });
  });
  it('should respond with a 201 Created User on success', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
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
        res.body.status.should.eql('success');
        done();
      });
  });
});

describe('POST /api/v1/users/signin', () => {
  it('should respond with a 202 Username/password Valid', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        username: 'nobody',
        password: 'nobody_password',
      })
      .end((err, res) => {
        should.not.exist(err); // ensure no errors
        res.status.should.equal(202);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        done();
      });
  });
  it('should respond with a 200 Username invalid', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        username: 'nob',
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
  it('should respond with a 200 Username/Password invalid', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
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
  it('should respond with a 401 no username', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        password: 'wrong_password',
      })
      .end((err, res) => {
        should.exist(err); // ensure no errors
        res.status.should.equal(401);
        res.type.should.equal('application/json');
        res.body.status.should.eql('no Username');
        done();
      });
  });
  it('should respond with a 401 no password', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        username: 'nobody',
      })
      .end((err, res) => {
        should.exist(err); // ensure no errors
        res.status.should.equal(401);
        res.type.should.equal('application/json');
        res.body.status.should.eql('no Password');
        done();
      });
  });
});
