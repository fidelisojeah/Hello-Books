'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _UserHandlers = require('./controllers/UserHandlers');

var _UserHandlers2 = _interopRequireDefault(_UserHandlers);

var _Bookhandlers = require('./controllers/Bookhandlers');

var _Bookhandlers2 = _interopRequireDefault(_Bookhandlers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
  extended: false
}));
app.use(_bodyParser2.default.json({
  type: 'application/json'
}));
// would not work atm
// app.post('/api/v1/users/signup', UserController.signup); // signup route
// app.post('/api/v1/users/signin', UserController.signin); // signin route would not work atm

app.post('/api/v2/users/signin', _UserHandlers2.default.login);
app.post('/api/v2/users/signup', _UserHandlers2.default.signupNew); // signup route with membership, single table

app.post('/api/v3/users/signup', _UserHandlers2.default.signupv3); // New login with email or uswername
app.post('/api/v3/users/signin', _UserHandlers2.default.loginNew); // New login with email or uswername

app.delete('/api/v2/users', _UserHandlers2.default.clearTable);
// app.delete('/api/v1/users', UserController.deleteAll);
app.delete('/api/v1/books', _Bookhandlers2.default.deleteAllBooks);

app.post('/api/v1/users/:userId/books', _UserHandlers2.default.borrowBook);
app.get('/api/v1/Users/:userId/books', _UserHandlers2.default.viewBorrowed).put('/api/v1/Users/:userId/books', _UserHandlers2.default.returnBook);

/*
app.get('*', (req, res) => res.status(404).send({
  message: 'Sorry Bro That\'s not a request',
}));
*/
app.get('/', function (req, res) {
  return res.status(202).send({
    message: 'Welcome to Hello-Books'
  });
});
app.post('/api/v1/books', _Bookhandlers2.default.newBook);

app.post('/api/v1/books/mod', _Bookhandlers2.default.bookQuant);

app.get('/api/v1/books', _Bookhandlers2.default.allBooks);

app.put('/api/v1/books/:bookId', _Bookhandlers2.default.modBook);

app.post('/api/v1/authors', _Bookhandlers2.default.newAuthor);

// const secret = require('../server/config/appsecret');

var port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

// app.set('secretSecret',secret.secret);

var server = _http2.default.createServer(app);
server.listen(port);

exports.default = app;