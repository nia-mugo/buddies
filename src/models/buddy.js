'use strict';

const Promise = require('bluebird');
const {getConnection} = require('../helpers/mysql');
const {BadRequest} = require('../helpers/errors');

/**
 * Buddy Model
 *
 * @class Buddy
 */
class Buddy {
  /**
   *Creates an instance of Buddy.
   * @param {integer} userId
   * @param {string} email
   * @param {string} message
   * @memberof Buddy
   */
  constructor(userId, email, message= "") {
    this.userId = userId;
    this.buddyEmail = email;
    this.status = 'pending';
    this.message = message;
  }

  /**
   * Create A Buddy Request
   *
   * @memberof Buddy
   */
  async createBuddyRequest() {
    try {
      const result = await Promise.using(getConnection(), (connection) => {
        return connection.queryAsync(
          'INSERT INTO buddies (userId, buddyEmail, message, status) VALUES (?, ?, ?, ?)',
          [this.userId, this.buddyEmail, this.message, this.status]); 
      });
      this.id = result.insertId;
      return this.toJson();
    } catch(error) {
      if(error.code === 'ER_DUP_ENTRY') {
        throw new BadRequest('buddy request already exists');
      }
      throw error;
    }
  }

  /**
   * Get My Buddy Requests
   * @param {int} userId
   * @param {string} email
   */
  static async getBuddyRequests(userId, email) {
    const results = await Promise.using(getConnection(), (connection) => {
      return connection.queryAsync(
        `
          SELECT buddies.*, users.name as buddyName FROM buddies 
          LEFT JOIN users ON users.email = buddies.buddyEmail
          WHERE buddies.userId = ? or buddies.buddyEmail = ? 
        `, 
      [userId, email]);
    });
    const myBuddies = results.filter(buddy => buddy.status === 'accepted');
    const incomingBuddyRequests = results.filter(buddy => buddy.userId !== userId && buddy.status === 'pending');
    const outgoingBuddyRequests = results.filter(buddy => buddy.userId === userId && buddy.status === 'pending');

    return {
      myBuddies,
      incomingBuddyRequests,
      outgoingBuddyRequests
    }
  }

  /**
   * Accept a Buddy Request
   *
   * @memberof Buddy
   */
  async acceptBuddyRequest() {

  }

  /**
   * Returns JSON object of required columns only 
   * @return {object}
   */
  toJson() {
    return {
      id: this.id,
      userId: this.userId,
      buddyEmail: this.buddyEmail,
      status: this.status,
      message: this.message
    }
  }
}

module.exports = Buddy;
