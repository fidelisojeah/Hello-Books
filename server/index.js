import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import http from 'http';
/*
import jwt from 'jsonwebtoken';
*/
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


app.delete('/api/v2/users', UserController.clearTable);
app.delete('/api/v1/books', BookController.deleteAllBooks);

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
