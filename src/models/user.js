'use strict';

const Promise = require('bluebird');
const bcrypt = require('bcrypt');
const {getConnection} = require('../helpers/mysql');
const {BadRequest, NotFoundError, AuthError} = require('../helpers/errors');

const SALT_ROUNDS = 10;

/**
 * User Model
 */
class User {
  /**
   * Creates an instance of a User
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @param {string} userId
   * @memberof User
   */
  constructor(name, email, password, userId=0 ) {
    this.name = name;
    this.email = email;
    this._password = password;
    this.role = 'user';
    if (userId!=0) {
      this.userId= userId;
    }
  }

  /**
   * Register a new user
   *
   * @memberof User
   */
  async registerUser() {
    try {
      this._password = await this.hashPassword(this._password);
      const result = await Promise.using(getConnection(), (connection) => {
        return connection.queryAsync(
            'INSERT INTO users(name, email, password, role) VALUES(?, ?, ?, ?)',
            [this.name, this.email, this._password, this.role]
        );
      });

      this.userId = result.insertId;
      return this.toJson();
    } catch(error) {
      if(error.code === 'ER_DUP_ENTRY') {
        throw new BadRequest('email address already exists');
      }
      throw error;
    }
  }

  /**
   * Hashes the password before it is saved to the database
   *
   * @param {string} password
   * @return {string} hashed password
   */
  async hashPassword(password) {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    return hash;
  }

  /**
   * Compares user email and password and returns user object
   * 
   * @param {string} email 
   * @param {string} password 
   */
  static async login(email, password) {
    try {
      const user = await this.getUserByEmail(email);
      const passwordIsValid = await bcrypt.compare(password, user._password);
      if(passwordIsValid) {
        return user.toJson();
      }
      throw new AuthError();
    } catch(error) {
      // all errors from authentication services are treated as email/password errors
      throw new AuthError('email address/ password mismatch');
    }
  }

  /**
   * Get User by Email Address
   * @param {*} email 
   */
  static async getUserByEmail(email) {
    const result = await Promise.using(getConnection(), (connection) => {
      return connection.queryAsync(
        'SELECT id, name, email, password, role FROM users WHERE email = ?',
        [email]
      );
    });

    if(result.length) {
      let user = result[0];
      user = new User(user.name, user.email, user.password, user.id);
      return user;
    }
    throw new NotFoundError('email address not found');
  }



  /**
   * Returns some user fields for display
   *
   * @return {object} user
   * @memberof User
   */
  toJson() {
    return {
      userId: this.userId,
      name: this.name,
      email: this.email
    };
  }
}


module.exports = User;
