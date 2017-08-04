const app = require('../app');
const request = require('supertest');

describe('GET /', () => {
  it('should respond with 404 and status message', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, {
        message: 'Sorry Bro That\'s not a request',
      }, done);
  });
});
