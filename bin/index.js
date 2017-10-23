import express from 'express';
import http from 'http';
import path from 'path';
// import app from 'index.js';

const app = express();

const port = parseInt(process.env.PORT, 10) || 8300;
app.set('port', port);

app.get('/*', (request, response) =>
  response.sendFile(path.join(__dirname, '../client/index.html')),
);
const server = http.createServer(app);
server.listen(port);
