'use strict';

const config = require('./config');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const moment = require('moment-timezone');
const session = require('express-session');
const winston = require('winston');

const authMiddleWare = require('./src/middleware/authentication');
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

// middleware

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 600000
  }
}));
app.use(authMiddleWare);
app.use(express.static('./src/public'));

app.set('view engine', 'pug');
app.set('views', './src/views/');

app.use(routes);

app.listen(PORT, () => {
  winston.info(`app listening on ${PORT}`);
});

module.exports = app;