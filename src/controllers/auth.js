'use strict';

const User = require('../models/user');
const {BadRequest} = require('../helpers/errors');

/**
 * Register User
 *
 * @param {object} req
 * @return {object} User Object
 */
async function register(req) {
  const {body} = req;

  if (!body) {
    throw new BadRequest('request does not contain any data');
  }

  if (!body.name || body.name.length === 0) {
    throw new BadRequest('name is required');
  }

  if (!body.email || body.email.length < 3) {
    throw new BadRequest('email is required');
  }

  if (!body.password || body.password.length < 6) {
    throw new BadRequest('password is required and must be greater than 6 characters');
  }

  if (body.confirmPassword !== body.password) {
    throw new BadRequest('passwords dont match');
  }

  const {name, email, password} = body;

  const user = new User(name, email, password);
  await user.registerUser();
  return user.toJson();
}

/**
 * User Login
 * 
 * @param {object} req 
 */
async function login(req) {
  const {body} = req;

  if (!body) {
    throw new BadRequest('request does not contain any data');
  }

  if (!body.email || body.email.length < 3) {
    throw new BadRequest('email is required');
  }

  if (!body.password || body.password.length < 6) {
    throw new BadRequest('password is required');
  }
  
  const { email, password } = req.body;
  return User.login(email, password);
}

module.exports = {
  register,
  login
};