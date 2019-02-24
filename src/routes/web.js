'use strict';

const { Router } = require('express');

const authController = require('../controllers/auth');
const buddyController = require('../controllers/buddies');

const { ApiError } = require('../helpers/errors');

// eslint-disable-next-line new-cap
const router = Router();

router.get('', async (req, res) => {
  await renderIndex(req, res);
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res, next) => {
  try {
    const userData = await authController.register(req);
    req.session.user = userData;
    return res.status(201).json(userData);
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.toJson());
    } else {
      return res.status(500).json({error: 'Oops an unknown error occurred'});
    }
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await authController.login(req);
    req.session.user = userData;
    res.status(200).json(userData);
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.toJson());
    }
    return res.status(500).json({error: 'Oops an unknown error occurred'});
  }
});

router.post('/buddies', async (req, res) => {
  try {
    const data = await buddyController.createBuddy(req);
    res.status(201).json(data);
  } catch(error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.toJson());
    }
    return res.status(500).json({error: 'Oops an unknown error occurred'});
  }
});

router.put('/buddies', async (req, res) => {
  try {
    const data = await buddyController.acceptBuddyRequest(req, res);
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.toJson());
    }
    return res.status(500).json({error: 'Oops an unknown error occurred'});
  }
});

router.get('/buddies', async (req, res) => {
  try {
    const data = await buddyController.getBuddies(req);
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.toJson());
    }
    return res.status(500).json({error: 'Oops an unknown error occurred'});
  }
});

async function renderIndex(req, res, error= {}) {
  const user = {user: req.session.user};
  const buddies = await buddyController.getBuddies(req);
  res.render('index', Object.assign({}, user, buddies, error));
}


module.exports = router;