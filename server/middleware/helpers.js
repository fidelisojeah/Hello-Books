import jwt from 'jsonwebtoken';


class jwTokens {

  static generateToken(req, tokenInfo, tokenTime) {
    return new Promise((resolve, reject) => {
      jwt
        .sign(
          tokenInfo,
          req.app.get('JsonSecret'), {
            expiresIn: tokenTime,
          },
          (tokenError, encodedToken) => {
            if (tokenError) {
              reject(tokenError);
            } else if (encodedToken) {
              resolve(encodedToken);
            }
          });
    });
  }
  static verifyToken() {
    return new Promise((resolve, reject) => {

    });
  }
}
export default jwTokens;
