'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const should = chai.should();

chai.use(chaiHttp);

const client = chai.request(server).keepOpen();

module.exports = {
  should,
  client,
};
