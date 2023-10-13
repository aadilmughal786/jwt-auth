const express = require('express');
const {verifyRefreshToken} = require('../middlewares/auth-jwt');
const {userRefresh} = require('../controllers/auth.controller');
const {verifySignUp} = require('../middlewares');
const controller = require('../controllers/auth.controller');

const router = express.Router();

// Define a validation middleware for the signup route
const validateSignup = [
  verifySignUp.checkDuplicateUsername,
  verifySignUp.checkDuplicateEmail,
  verifySignUp.checkRolesExisted,
];

// Define the authentication routes
router.post('/signup', validateSignup, controller.signup);
router.post('/signin', controller.signin);
router.post('/refresh-token', verifyRefreshToken, userRefresh);

module.exports = router;
