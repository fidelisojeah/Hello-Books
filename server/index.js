import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cookieEncrypter from 'cookie-encrypter';
import session from 'express-session';
import http from 'http';
import path from 'path';

import BookController from './controllers/BookController';
import BookCategory from './controllers/BookCategory';
import UserAuthentication from './controllers/UserAuthentication';
import UserBookInteraction from './controllers/UserBookInteraction';
import CheckSession from './middleware/CheckSession';


const app = express();
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

app.get('/api/v1/user/verify/:username',
  UserAuthentication
    .generateActivationEmail);

app.post('/api/v1/users/signup', UserAuthentication.signUp);

app.get('/api/v1/users/signupCheck/:identifier',
  UserAuthentication.checkUserExists);

app.get('/api/v1/users/verify', UserAuthentication.activateUser);

app.post('/api/v1/users/signin', UserAuthentication.signIn);

// for user - book handling
app.post('/api/v1/users/:userId/books',
  CheckSession.checkLogin,
  UserBookInteraction.borrowBook);

app.get('/api/v1/users/:userId/books',
  CheckSession.checkLogin,
  UserBookInteraction.viewBorrowedBook);

app.get('/api/v1/users/:userId/books/list/:page',
  CheckSession.checkLogin,
  UserBookInteraction.viewBorrowedBookHistory);

app.put('/api/v1/users/:userId/books',
  CheckSession.checkLogin,
  UserBookInteraction.returnBook);

app.get('/api/v1/users/history/:bookId',
  CheckSession.checkLogin,
  UserBookInteraction.userBookHistory
);

app.get('/api/v1/sorted/books', CheckSession.checkLogin,
  BookController.viewBooksHomePage);

// for book stuff
app.post('/api/v1/authors', CheckSession.checkLogin,
  BookController.newAuthor);

app.get('/api/v1/authors', CheckSession.checkLogin,
  BookController.getAuthors);

app.get('/api/v1/search/authors',
  CheckSession.checkLogin, BookController.searchAuthors);

app.get('/api/v1/search/categories',
  CheckSession.checkLogin, BookCategory.searchCategories);

app.post('/api/v1/books', CheckSession.checkLogin,
  BookController.newBook);

app.get('/api/v1/books/list/:page',
  CheckSession.checkLogin, BookController.viewAllBooks);

app.get('/api/v1/books', CheckSession.checkLogin,
  BookController.viewBooks);

app.post('/api/v1/books/category',
  CheckSession.checkLogin, BookCategory.newCategory);

app.delete('/api/v1/books/category',
  CheckSession.checkLogin, BookCategory.deleteCategory);

app.delete('/api/v1/book/category',
  CheckSession.checkLogin, BookCategory.deleteBookCategory);


app.put('/api/v1/books/category',
  CheckSession.checkLogin, BookCategory.addBookCategory);

app.get('/api/v1/books/category/:categoryId',
  CheckSession.checkLogin, BookCategory.viewByCategory);

app.get('/api/v1/books/lists/categories',
  CheckSession.checkLogin, BookCategory.viewCategories);

app.put('/api/v1/books/:bookId',
  CheckSession.checkLogin, BookController.modifyBook);

app.post('/api/v1/books/:bookId/quantity',
  CheckSession.checkLogin, BookController.updateBookQuantity);


app.get('/api/v1/users/logout', CheckSession.clearLogin);

app.use('/apidocs/', express.static(path.resolve(__dirname, '../slate/')));

if (environment === 'production') {
  app.get('*.js', (request, response, next) => {
    request.url += '.gz';
    response.set('Content-Encoding', 'gzip');
    response.set('Content-Type', 'text/javascript');
    next();
  });

  app.get('*.css', (request, response, next) => {
    request.url += '.gz';
    response.set('Content-Encoding', 'gzip');
    response.set('Content-Type', 'text/css');
    next();
  });
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
