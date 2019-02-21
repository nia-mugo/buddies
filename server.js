'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const winston = require('winston');
const routes = require('./src/routes');


const fileTransport = new winston.transports.File({
  level: 'info',
  filename: 'app.log',
  handleExceptions: true,
  json: true,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  colorize: false
});

winston.configure({
  transports: [fileTransport]
});

const PORT = 3000;

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('./src/public'));

app.set('view engine', 'pug');
app.set('views', './src/views/');

app.use(routes);

app.listen(PORT, () => {
  winston.info(`app listening on ${PORT}`);
});

module.exports = app;