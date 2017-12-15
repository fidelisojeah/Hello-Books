import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cookieEncrypter from 'cookie-encrypter';
import session from 'express-session';
import http from 'http';
import path from 'path';

import BookProps from './controllers/books-controller-v4';
import UserLoginDetails from './controllers/user-controller-v4';
import UserBookInteraction from './controllers/user-books-controller';
import CheckSession from './middleware/session';

const app = express();
// load environmental variables
require('dotenv').config();

const jsonSecretKey = process.env.JSONWEB_SECRET;
const cookieSecretKey = process.env.COOKIE_SECRET_KEY;
const sessionSecretKey = process.env.SESSION_SECRET_KEY;
const environment = process.env.NODE_ENV;

const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

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

app.post('/api/v4/users/signup', UserLoginDetails.signUp);

app.get('/api/v4/users/signupCheck/:identifier',
  UserLoginDetails.checkUserExists);

app.get('/api/v4/users/verify', UserLoginDetails.activateUser);

app.post('/api/v4/users/signin', UserLoginDetails.signIn);

// for user - book handling
app.post('/api/v4/users/:userId/books',
  CheckSession.checkLogin,
  UserBookInteraction.borrowBook);

app.get('/api/v4/users/:userId/books',
  CheckSession.checkLogin,
  UserBookInteraction.viewBorrowedBook);

app.put('/api/v4/users/:userId/books',
  CheckSession.checkLogin,
  UserBookInteraction.returnBook);

app.get('/api/v4/users/history/:bookId',
  CheckSession.checkLogin,
  UserBookInteraction.userBookHistory
);

// for book stuff
app.post('/api/v4/authors', CheckSession.checkLogin, BookProps.newAuthor);

app.get('/api/v4/authors', CheckSession.checkLogin, BookProps.getAuthors);

app.get('/api/v4/search/authors',
  CheckSession.checkLogin, BookProps.searchAuthors);

app.post('/api/v4/books', CheckSession.checkLogin, BookProps.newBook);

app.get('/api/v4/books/list/:page',
  CheckSession.checkLogin, BookProps.viewAllBooks);

app.get('/api/v4/books', CheckSession.checkLogin, BookProps.viewBooks);

app.put('/api/v4/books/:bookId',
  CheckSession.checkLogin, BookProps.modifyBook);

app.post('/api/v4/books/:bookId/quantity',
  CheckSession.checkLogin, BookProps.updateBookQuantity);

app.get('/api/v4/users/logout', CheckSession.clearLogin);

app.use('/apidocs/', express.static(path.resolve(__dirname, '../slate/')));

if (environment === 'production') {
  app.use(express.static(DIST_DIR));
  app.get('/*', (request, response) => response.sendFile(HTML_FILE));
} else {
  // log requests
  app.use(logger('dev'));
  app.get('/', (request, response) => response.status(202).send({
    message: 'Welcome to Hello-Books',
  }));
}


// set port variable to value of env.Port or default to 8000
const port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);

// create server and listen
const server = http.createServer(app);
server.listen(port);

export default app;
