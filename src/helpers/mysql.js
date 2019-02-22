'use strict';

const mysql = require('mysql');
const Promise = require('bluebird');
const winston = require('winston');

const mysqlConfig = require('../../database.json');

Promise.promisifyAll(mysql);
Promise.promisifyAll(require('mysql/lib/Connection').prototype);
Promise.promisifyAll(require('mysql/lib/Pool').prototype);

const pool = mysql.createPool(mysqlConfig.default);

pool.on('error', (error) =>{
  winston.error('mysql error: %j', error);
});

/**
 * Get Connection
 *
 * gets a single connection that can be shared for sequential
 * subsequent queries.
 *
 * @return {Object} connection
 */
function getConnection() {
  return pool.getConnectionAsync().disposer((connection) => {
    connection.release();
  });
}

/**
 * Get Connection Pool
 *
 * gets an instance of the mysql connection pool
 * allowing multiple parallel queries
 * connections are auto released
 * warning: this can easily DDOS other endpoints
 *
 * @return {Object} pool
 */
function getConnectionPool() {
  return pool;
}

module.exports = {
  getConnection,
  getConnectionPool,
};