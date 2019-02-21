'use strict';

const { Router } = require('express');
const web = require('./web');
// eslint-disable-next-line new-cap
const router = Router();

router.use('/', web);

module.exports = router;

