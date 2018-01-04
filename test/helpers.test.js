import chai from 'chai';
import chaiHttp from 'chai-http';

import db from '../server/models';
import CheckSession from '../server/middleware/CheckSession';
import HelloBooksSendMail from '../server/helpers/HelloBooksSendMail';
import BookVerification from '../server/helpers/BookVerification';
import JwTokens from '../server/helpers/JwTokens';

import { fakeMailInfo, fakeMailInfoWrong } from './mockData';

chai.use(require('chai-as-promised'));

const should = chai.should();

chai.use(chaiHttp);

require('dotenv').config();


describe('Middleware Tests', () => {
  describe('Check Admin middleware test', () => {
    let userDetailsFindOne;
    before((done) => {
      userDetailsFindOne = db.UserDetails.findOne;
      db.UserDetails.findOne = () =>
        Promise.reject(new Error('WRONG!!!'));
      done();
    });
    after((done) => {
      db.UserDetails.findOne = userDetailsFindOne;
      done();
    });
    it('Should return an error if no token is sent', () =>
      CheckSession
        .checkAdmin()
        .then(response =>
          should.not.exist(response)
        )
        .catch((error) => {
          should.exist(error);
          error.should.equal('Token Invalid');
          return 1;
        })
    );
    it('Should return an error if dB has error', () =>
      CheckSession
        .checkAdmin({
          userId: 1
        })
        .then(response =>
          should.not.exist(response)
        )
        .catch((error) => {
          should.exist(error);
          error.should.eql('Token Invalid');
          return 1;
        })
    );
  });
  describe('Test Node Email Class', () => {
    it('should return Mail Sent on success', (done) => {
      const testMail = new HelloBooksSendMail(
        fakeMailInfo,
        'fakeToken'
      );
      testMail
        .sendVerificationEmail()
        .should
        .eventually
        .equal('Mail Sent')
        .notify(done);
    });
    it('should No recipient email when no address is sent', (done) => {
      const testMail = new HelloBooksSendMail(
        fakeMailInfoWrong,
        'fakeToken'
      );
      testMail
        .sendVerificationEmail()
        .should
        .rejectedWith('No Recipient Email')
        .notify(done);
    });
  });
  describe('Test new Book validator', () => {
    it('should return an object with book variables', (done) => {
      BookVerification
        .checkNewBookVariables(
        'A Sample Book',
        '0-1237-19733-1271-1',
        null,
        'Sample Book Information',
        null,
        1,
        '1, 3, 7'
        )
        .should
        .eventually
        .have
        .property('bookImage')
        .notify(done);
    });
  });
  describe('JwTokens Class', () => {
    describe('Test Random String Generation', () => {
      it('should return a randomly generated string', (done) => {
        JwTokens
          .randomString(24)
          .should
          .eventually
          .be
          .ok
          .notify(done);
      });
    });
    describe('token Generation Method', () => {
      it('should return an error on failure', (done) => {
        JwTokens
          .generateToken(null, 'randomToken', '24h')
          .should
          .eventually
          .be
          .rejected
          .notify(done);
      });
    });
  });
});
