const express = require('express');
const {authJwt} = require('../middlewares');
const controller = require('../controllers/user.controller');
const router = express.Router();
const {verifyAccessToken} = require('../middlewares/auth-jwt');

// Define authentication middleware for user roles
const isModerator = [authJwt.verifyAccessToken, authJwt.isModerator];
const isAdmin = [authJwt.verifyAccessToken, authJwt.isAdmin];

// Define the user-related routes
router.get('/all', controller.allAccess);
router.get('/user', verifyAccessToken, controller.userBoard);
router.get('/mod', verifyAccessToken, isModerator, controller.moderatorBoard);
router.get('/admin', verifyAccessToken, isAdmin, controller.adminBoard);

module.exports = router;
