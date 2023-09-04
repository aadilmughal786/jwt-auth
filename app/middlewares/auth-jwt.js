const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models/index.js");
const User = db.user;
const Role = db.role;

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
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

const isModerator = async (req, res, next) => {
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

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};
module.exports = authJwt;
