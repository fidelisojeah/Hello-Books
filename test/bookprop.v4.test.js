import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';

import app from '../server';

const should = chai.should();

chai.use(chaiHttp);

describe('POST /api/v4/authors version 4', () => {
  describe('When no token is provided', () => {
    it('should return 401 Unsuccessful when no token is provided', (done) => {
      chai.request(app)
        .post('/api/v4/authors')
        .end((err, res) => {
          should.exist(err);// or not
          res.status.should.equal(401);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Unsuccessful');
          res.body.message.should.eql('Unauthenticated');
          res.body.error.should.eql('Token not found');
          done();
        });
    });
  });
});


/*
{
    "status": "Unsuccessful",
    "message": "Unauthenticated",
    "error": "Token not found"
}
*/
