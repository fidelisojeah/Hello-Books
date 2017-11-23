import jwt from 'jsonwebtoken';
import crypto from 'crypto';

class JwTokens {
  // random 24 character string
  static randomString(modifier) {
    return new Promise((resolve) => {
      crypto.randomBytes(modifier, (error, buf) => { // generate random bytes
        if (error) {
          reject(error);
        } else {
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
          if (tokenError) {
            reject(tokenError);
          } else {
            resolve(encodedToken);
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
          } else {
            resolve(verifiedToken);
          }
        });
    });
  }
}
export default JwTokens;
