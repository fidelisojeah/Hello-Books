const app = require('../app');
const request = require('supertest');

describe('GET /', () => {
  it('it should respond with a Welcome to Hello Books in JSON',
    (done) => {
      request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('content-Type', /json/)
        .expect(200, {
          message: 'Welcome to Hello Books',
        }, done);
    });
});
