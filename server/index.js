import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import http from 'http';
import jwt from 'jsonwebtoken';
import UserController from './controllers/UserHandlers';
import BookController from './controllers/Bookhandlers';
import userLoginDetails from './controllers/user-controller-v4';

const app = express();

// log requests
app.use(logger('dev'));
// Set JWT secret
app.set('JsonSecret', 'myJS0NSecretHell0Bo0ksWh@t3v3r');
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json({
  type: 'application/json',
}));

app.post('/api/v4/users/signup', userLoginDetails.signup);

/* Olds
  // app.post('/api/v1/users/signup', UserController.signup); // signup route
  // app.post('/api/v1/users/signin', UserController.signin); // signin route would not work atm
  // app.delete('/api/v1/users', UserController.deleteAll);
*/
/*
  app.post('/api/v2/users/signin', UserController.login);
  app.post('/api/v2/users/signup', UserController.signupNew); 
  // signup route with membership, single table

  app.post('/api/v3/users/signup', UserController.signupv3); // New login with email or uswername
  app.post('/api/v3/users/signin', UserController.loginNew); // New login with email or uswername

  app.delete('/api/v2/users', UserController.clearTable);
  app.delete('/api/v1/books', BookController.deleteAllBooks);

  app.post('/api/v1/users/:userId/books', UserController.borrowBook);
  app.get('/api/v1/Users/:userId/books', UserController.viewBorrowed)
    .put('/api/v1/Users/:userId/books', UserController.returnBook);
  app.post('/api/v1/books', BookController.newBook);
  app.post('/api/v1/books/mod', BookController.updateBookQuantity);
  app.get('/api/v1/books', BookController.allBooks);
  app.put('/api/v1/books/:bookId', BookController.modBook);
  app.post('/api/v1/authors', BookController.newAuthor);
*/

app.get('/', (req, res) => res.status(202).send({
  message: 'Welcome to Hello-Books',
}));


// set port variable to value of env.Port or default to 8000
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

// create server and listen
const server = http.createServer(app);
server.listen(port);

export default app;
