const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const { user: User, role: Role } = require("../models/index");

// Verify the JWT token provided in the request headers
exports.verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

// Check if the user is an admin
exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const roles = await Role.find({ _id: { $in: user.roles } });

    if (!roles.some((role) => role.name === "admin")) {
      return res.status(403).json({ message: "Require Admin Role!" });
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Check if the user is a moderator
exports.isModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const roles = await Role.find({ _id: { $in: user.roles } });

    if (!roles.some((role) => role.name === "moderator")) {
      return res.status(403).json({ message: "Require Moderator Role!" });
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
