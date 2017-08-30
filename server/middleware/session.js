import jwt from 'jsonwebtoken';

const cookieParams = {
  httpOnly: true,
  signed: true,
  maxAge: 300000,
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
    console.log(req.signedCookies);
    res.status(206).json({
      token: req.signedCookies[userCookieInfo],
    });
  }
  static checkLogin(req, res) { // confirm user login
    //   return new Promise((resolve, reject) => {
    // get cookie from browser (signed with keys)
    const userInfo = req.signedCookies[userCookieInfo] || null;
    if (userInfo === null) {
      res.status(400).json({
        error: 'not found',
      });
      // reject('Not Logged in');
    } else {
      // verify token in cookie is still valid
      jwt.verify(userInfo,
        req.app.get('JsonSecret'),
        (error, verifiedToken) => {
          if (error) {
            res.status(403).send(error);
          } else if (verifiedToken) {
            res.status(200).json({
              token: verifiedToken,
            });
          }
        });
    }
    //   });
  }
  static setLogin(req, res, jwToken) {
    return res.cookie(userCookieInfo, jwToken, cookieParams);
  }
}
export default checkSession;
