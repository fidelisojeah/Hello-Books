const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const UserController = require('./server/controllers/UserHandlers');
const BookController = require('./server/controllers/Bookhandlers');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.post('/api/v1/users/signup', UserController.signup); // signup route
app.post('/api/v1/users/signin', UserController.signin); // signin route

app.delete('/api/v1/users', UserController.deleteAll);

app.get('*', (req, res) => res.status(404).send({
  message: 'Sorry Bro That\'s not a request',
}));

app.post('/api/v1/books', BookController.newBook);
app.post('/api/v1/authors', BookController.newAuthor);


module.exports = app;
