const express = require("express");

const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

const router = express.Router();

// Define authentication middleware for user roles
const verifyToken = [authJwt.verifyToken];
const isModerator = [authJwt.verifyToken, authJwt.isModerator];
const isAdmin = [authJwt.verifyToken, authJwt.isAdmin];

// Define the user-related routes
router.get("/all", controller.allAccess);
router.get("/user", verifyToken, controller.userBoard);
router.get("/mod", isModerator, controller.moderatorBoard);
router.get("/admin", isAdmin, controller.adminBoard);

module.exports = router;
