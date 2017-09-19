import jwt from 'jsonwebtoken';
import crypto from 'crypto';

class JwTokens {
  // random 24 character string
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
  static generateToken(tokenSecret, tokenInfo, tokenTime) {
    return new Promise((resolve, reject) => {
      jwt
        .sign(
        tokenInfo,
        tokenSecret, {
          expiresIn: tokenTime,
        },
        (tokenError, encodedToken) => {
          if (encodedToken) {
            resolve(encodedToken);
          } else if (tokenError) {
            reject(tokenError);
          } else {
            reject('error');
          }
        });
    });
  }
  // to verify token
  static verifyToken(req, userToken) {
    return new Promise((resolve, reject) => {
      jwt
        .verify(userToken,
        req.app.get('JsonSecret'),
        (error, verifiedToken) => {
          if (error) {
            reject(error);
          } else if (verifiedToken) {
            resolve(verifiedToken);
          } else {
            reject('error');
          }
        });
    });
  }
}
export default JwTokens;
