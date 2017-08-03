const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const UserController = require('./server/controllers/UserHandlers');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.post('/api/v1/users/signup', UserController.create);

app.delete('/api/v1/users', UserController.deleteAll);

app.get('*', (req, res) => res.status(404).send({
  message: 'Sorry Bro That\'s not a request',
}));


module.exports = app;
