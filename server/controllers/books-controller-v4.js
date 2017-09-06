import {
  Authors,
  Books,
} from '../models';
import jwTokens from '../middleware/helpers';
import checkSession from '../middleware/session';

// const userCookieInfo = 'userCookieInfo';

class bookProps {
  static newAuthor(req, res) {
    checkSession
      .checkAdmin(req.decoded)
      .then(() => {
        // console.log('here');
        const firstName = req.body.firstname || null;
        const lastName = req.body.lastname || null;
        const dateOB = req.body.authorDOB || null;
        const knownAs = req.body.authorAKA || `${firstName} ${lastName}`;
        if (firstName !== null
          && lastName !== null) {
          Authors// create new author
            .create({
              authorFirstName: firstName,
              authorLastName: lastName,
              dateofBirth: dateOB,
              authorAKA: knownAs,
            })
            .then(() => { // if author creation was successful
              res.status(201).json({
                status: 'Success',
                message: 'Author Created Successfully',
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
  static
}

export default bookProps;
