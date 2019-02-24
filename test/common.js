'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const Promise = require('bluebird');
const server = require('../server');
const {getConnection} =require('../src/helpers/mysql');

const should = chai.should();

chai.use(chaiHttp);

const client = chai.request(server).keepOpen();
const authedClient = chai.request.agent(server).keepOpen();

async function clearTestBuddies() {
  await Promise.using(getConnection(), async connection => {
    return await connection.queryAsync('DELETE FROM buddies');
  });
}

async function clearTestUsers() {
  await Promise.using(getConnection(), async connection => {
    return await connection.queryAsync('DELETE FROM users');
  });
}

module.exports = {
  should,
  client,
  authedClient,
  clearTestBuddies,
  clearTestUsers
};


