import {
  Authors,
  Books,
} from '../models';
import jwTokens from '../middleware/helpers';
import checkSession from '../middleware/session';

// const userCookieInfo = 'userCookieInfo';

class bookProps {
  // static checkCookies(req, res) {
  //   const info = req.signedCookies[userCookieInfo];
  //  }

  static newAuthor(req, res) {
    console.log(req.decoded);
    checkSession
      .checkAdmin(req.decoded)
      .then((decodedInfo) => {
        // console.log('here');
        const firstName = req.body.firstname || null;
        const lastName = req.body.lastname || null;
        const dateOB = req.body.authorDOB || null;
        if (firstName !== null
          && lastName !== null) {
          Authors// create new author
            .create({
              authorFirstName: firstName,
              authorLastName: lastName,
              dateofBirth: dateOB,
            })
            .then((authorCreated) => { // if author creation was successful
              res.status(201).json({
                status: 'Success',
                data: {
                  AuthorName: `${authorCreated.authorFirstName} ${authorCreated.authorLastName}`,
                },
              });
            })
            .catch(error => res.status(500).send(error));
        } else { // incomplete details
          res.status(400).json({
            status: 'Unsuccessful',
            message: 'Incomplete details',
          });
        }
      })
      .catch((error) => {
        res.status(401).json({
          status: 'Unsuccessful',
          message: error,
        });
      });
  }
}

export default bookProps;
