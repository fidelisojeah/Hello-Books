import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// random 24 character string
const randomString = new Promise((resolve, reject) => {
  crypto.randomBytes(24, (error, buf) => { // generate random bytes
    if (error) {
      reject(error);
    } else if (buf) {
      resolve(buf.toString('hex'));
    }
  });
});

class jwTokens {

  static randomString() {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(24, (error, buf) => { // generate random bytes
        if (error) {
          reject(error);
        } else if (buf) {
          resolve(buf.toString('hex'));
        }
      });
    });
  }
  static generateToken(req, tokenInfo, tokenTime) {
    return new Promise((resolve, reject) => {
      jwt
        .sign(
          tokenInfo,
          req.app.get('JsonSecret'), {
            expiresIn: tokenTime,
          },
          (tokenError, encodedToken) => {
            if (encodedToken) {
              resolve(encodedToken);
            } else if (tokenError) {
              reject(tokenError);
            }
          });
    });
  }
  static verifyToken() {
    return new Promise((resolve, reject) => {
      jwt.verify();
    });
  }
}
export default jwTokens;
