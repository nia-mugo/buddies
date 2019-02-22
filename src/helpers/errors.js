'use strict';

/**
 * Base Error Handling Class
 *
 * @class ApiError
 * @extends {Error}
 */
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }

  toJson() {
    return {
      error: this.message,
    };
  }
}

/**
 * Class to handle 404 Errors
 *
 * @class NotFoundError
 * @extends {ApiError}
 */
class NotFoundError extends ApiError {
  /**
   *Creates an instance of NotFoundError.
   * @param {*} message
   * @memberof NotFoundError
   */
  constructor(message) {
    super(message, 404);
  }
}

/**
 *Class to handle Bad Requests
 *
 * @class BadRequest
 * @extends {ApiError}
 */
class BadRequest extends ApiError {
  /**
   *Creates an instance of BadRequest.
   * @param {*} message
   * @memberof BadRequest
   */
  constructor(message) {
    super(message, 400);
  }
}

/**
 * Class to handle Authentication Errors
 *
 * @class AuthError
 * @extends {ApiError}
 */
class AuthError extends ApiError {
  /**
   *Creates an instance of AuthError.
   * @param {*} message
   * @memberof AuthnError
   */
  constructor(message) {
    super(message, 401);
  }
}

/**
 * Class to handle Server Errors
 *
 * @class ServerError
 * @extends {ApiError}
 */
class ServerError extends ApiError {
  /**
   *Creates an instance of ServerError.
   * @param {*} message
   * @memberof ServerError
   */
  constructor(message) {
    super(message, 500);
  }
}

module.exports = {
  BadRequest,
  ServerError,
  NotFoundError,
  ApiError,
  AuthError
};