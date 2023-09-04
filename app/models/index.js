const mongoose = require("mongoose");

const constants = require("../constants/");
// Set the Mongoose promise implementation to use the global Promise object
mongoose.Promise = global.Promise;

// Create an object to hold the Mongoose instance, user model, role model, and roles array
const db = {};

// Assign the Mongoose instance to the db object
db.mongoose = mongoose;

// Import and assign the user and role models to the db object
db.user = require("./user.model");
db.role = require("./role.model");

// Define a constant array for roles that can be used throughout the application
db.ROLES = constants.ROLES;

module.exports = db;
