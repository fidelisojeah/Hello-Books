import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cookieEncrypter from 'cookie-encrypter';
import session from 'express-session';
import http from 'http';

import UserController from './controllers/UserHandlers';
import BookController from './controllers/Bookhandlers';
import bookProps from './controllers/books-controller-v4';
import userLoginDetails from './controllers/user-controller-v4';
import userBookInteraction from './controllers/user-books-controller';
import checkSession from './middleware/session';

const app = express();
// load environmental variables
require('dotenv').config();

const jsonSecretKey = process.env.JSONWEB_SECRET;
const cookieSecretKey = process.env.COOKIE_SECRET_KEY;
const sessionSecretKey = process.env.SESSION_SECRET_KEY;

// log requests
app.use(logger('dev'));
// Set JWT secret
app.set('JsonSecret', jsonSecretKey);
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json({
  type: 'application/json',
}));
// for cookies
app.use(cookieParser(cookieSecretKey));
app.use(cookieEncrypter(cookieSecretKey));

app.use(session({
  key: 'user_id',
  secret: sessionSecretKey,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 300000,
  },
}));

app.post('/api/v4/users/signup', userLoginDetails.signup);
app.get('/api/v4/users/:identifier', userLoginDetails.checkUserExists);
app.get('/api/v4/users/verify', userLoginDetails.activateUser);
app.post('/api/v4/users/signin', userLoginDetails.signin);

// for user - book handling
app.post('/api/v4/users/:userId/books',
  checkSession.checkLogin,
  userBookInteraction.borrowBook);
app.get('/api/v4/users/:userId/books',
  checkSession.checkLogin,
  userBookInteraction.viewBorrowedBook);
app.put('/api/v4/users/:userId/books',
  checkSession.checkLogin,
  userBookInteraction.returnBook);

app.delete('/api/users', UserController.clearTable);
app.delete('/api/v1/books', BookController.deleteAllBooks);

app.get('/', (req, res) => res.status(202).send({
  message: 'Welcome to Hello-Books',
}));
// for book stuff
app.post('/api/v4/authors', checkSession.checkLogin, bookProps.newAuthor);
app.get('/api/v4/authors', checkSession.checkLogin, bookProps.getAuthors);
app.post('/api/v4/books', checkSession.checkLogin, bookProps.newBook);
app.get('/api/v4/books', checkSession.checkLogin, bookProps.viewBooks);
app.put('/api/v4/books/:bookId', checkSession.checkLogin, bookProps.modifyBook);
app.post('/api/v4/books/:bookId/quantity', checkSession.checkLogin, bookProps.updateBookQuantity);

app.get('/api/v4/users/logout', checkSession.clearLogin);

// set port variable to value of env.Port or default to 8000
const port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);

// create server and listen
const server = http.createServer(app);
server.listen(port);

export default app;
