'use strict';

const { Router } = require('express');

const authController = require('../controllers/auth');
const { ApiError } = require('../helpers/errors');

// eslint-disable-next-line new-cap
const router = Router();

router.get('', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  try {
    const userData = await authController.register(req);
    req.session.user = userData;
    res.redirect(301, '/');
  } catch (error) {
    if (error instanceof ApiError) {
      return res.render('register', error.toJson());
    }
    return res.status(500).json({error: 'Oops an unknown error occurred'});
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await authController.login(req);
    req.session.user = userData;
    res.redirect(301, '/');
  } catch (error) {
    if (error instanceof ApiError) {
      return res.render('login', error.toJson());
    }
    return res.status(500).json({error: 'Oops an unknown error occurred'});
  }
});

module.exports = router;