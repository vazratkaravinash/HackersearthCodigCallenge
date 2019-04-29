'use strict'
const express = require('express');
const router = express.Router();
const authenticate = require('../helpers/authenticate');
const userController = require('../controller/user/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', userController.verifyUser);
router.post('/register',  userController.registerUser);

module.exports = router;
