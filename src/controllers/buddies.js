'use strict';
const Buddy = require('../models/buddy');
const {BadRequest} = require('../helpers/errors');

/**
 * Creat Buddy Controller
 * 
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
async function createBuddy(req) {
  const { body } = req;
  if (!body) {
    throw new BadRequest('request does not contain any data');
  }

  if (!body.email || body.email.length < 3) {
    throw new BadRequest('new buddy email is required');
  }

  const { userId } = req.session.user;
  const { email, message } = body;
  let buddy = new Buddy(userId, email, message);
  await buddy.createBuddyRequest();
  buddy = buddy.toJson();
  return buddy;
}

/**
 * Get Buddies
 * 
 * @param {object} req 
 * @param {object} res 
 */
async function getBuddies(req) {
  const { userId, email } = req.session.user;
  return await Buddy.getBuddyRequests(userId, email);
}

/**
 * Accept Buddy Request
 * 
 * @param {object} req 
 */
async function acceptBuddyRequest(req) {
  const { userId, email } = req.session.user;
  const { id } = req.body;
  await Buddy.acceptBuddyRequest(id, userId);
  return await Buddy.getBuddyRequests(userId, email);
}



module.exports = {
  createBuddy,
  getBuddies,
  acceptBuddyRequest
};