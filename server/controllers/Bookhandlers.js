const {
  Authors,
  Books,
} = require('../models');

exports.newAuthor = (req, res) => {
  if (req.body.authorFName && req.body.authorLName) {
    Authors.create({
      authorFirstName: req.body.authorFName,
      authorLastName: req.body.authorLName,
      dateofBirth: req.body.authorDOB,
    }).then((authorCreate) => {
      res.status(201).json({
        status: 'success',
        data: authorCreate,
      });
    }).catch(error => res.status(400).send(error));
  } else {
    res.status(401).json({
      status: 'incomplete Details',
    });
  }
};

exports.newBook = (req, res) => {
  Books.create({ // create book
    bookName: req.body.bookName,
    bookISBN: req.body.bookISBN,
    description: req.body.desc,
    bookImage: req.body.imagepath,
    publishYear: req.body.pubYear,
  }).then((bookID) => {
    Authors.findOne({ // find author
      where: {
        id: req.body.authorId,
      },
    }).then((AID) => {
      if (AID === null) { // if author not found
        res.status(200).json({
          status: 'no Author found',
          data: bookID,
        });
      } else { // if author found, addd author role
        bookID.addAuthor(AID).then(() => {
          res.status(201).json({
            status: 'success',
            data: bookID,
          });
        });
      }
    });
  });
};
