import jwt from 'jsonwebtoken';

const cookieParams = {
  httpOnly: true,
  signed: true,
  maxAge: 3000000,
};
const userCookieInfo = 'userCookieInfo';

class checkSession {

  static test(req, res) {
    const tokenInfo = {
      info: 'bla bla bla',
      userRole: 'user',
    };
    jwt.sign(tokenInfo,
      req.app.get('JsonSecret'), {
        expiresIn: '3h', // 3 hours
      },
      (tokenError, signIntoken) => {
        if (tokenError) {
          res.status(400).send(tokenError);
        } else if (signIntoken) {
          res.cookie(userCookieInfo, signIntoken, cookieParams);
          res.status(200).json({
            token: signIntoken,
          });
        }
      });
  }
  static test2(req, res) {
    res.status(206).json({
      token: req.signedCookies[userCookieInfo],
    });
  }
  static checkAdmin(decodedToken) {
    return new Promise((resolve, reject) => {
      if (decodedToken) {
        if (decodedToken.role === 'Admin') {
          resolve('Valid Token');
        } else {
          reject('Not allowed');
        }
      } else {
        reject('Token Invalid');
      }
    });
  }
  static checkLogin(req, res, next) {
    const userInfo = req.signedCookies[userCookieInfo] ||
      req.headers['x-access-token'] || null; // allow token to be in header for now
    if (userInfo === null) {
      res.status(401).json({
        status: 'Unsuccessful',
        message: 'Unauthenticated',
        error: 'Token not found',
      });
    } else {
      // verify token in cookie is still valid
      jwt
        .verify(userInfo,
        req.app.get('JsonSecret'),
        (error, verifiedToken) => {
          if (error) {
            res.status(401).json({
              status: 'Unsuccessful',
              message: 'Unathenticated',
              error: error.name,
            });
          } else if (verifiedToken) {
            if (verifiedToken.role) {
              req.decoded = verifiedToken;
              next();
            } else {
              res.status(401).json({
                status: 'Unsuccessful',
                message: 'Unathenticated',
                error: 'InvalidToken',
              });
            }
          }
        });
    }
  }
  static setLogin(req, res, jwToken) {
    return res.cookie(userCookieInfo, jwToken, cookieParams);
  }
}
export default checkSession;
