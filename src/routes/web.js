'use strict';

const { Router } = require('express');
// eslint-disable-next-line new-cap
const router = Router();

router.get('', (req, res) => {
  res.render('index');
});

module.exports = router;