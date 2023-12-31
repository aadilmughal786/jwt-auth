const {ROLES} = require('../constants');
const {user: User} = require('../models');

// Check if the username is already in use
exports.checkDuplicateUsername = async (req, res, next) => {
  try {
    const user = await User.findOne({username: req.body.username});
    if (user) {
      return res
        .status(400)
        .json({message: 'Failed! Username is already in use!'});
    }
    next();
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

// Check if the email is already in use
exports.checkDuplicateEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if (user) {
      return res
        .status(400)
        .json({message: 'Failed! Email is already in use!'});
    }
    next();
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

// Check if specified roles exist
exports.checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`,
        });
      }
    }
  }
  next();
};
