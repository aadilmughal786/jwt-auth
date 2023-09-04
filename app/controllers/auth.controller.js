const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require("../config/auth.config");
const db = require("../models");
const { SALT_ROUNDS } = require("../constants");
const User = db.user;
const Role = db.role;

exports.signup = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email is already in use." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Determine roles
    let userRoles = [];
    if (roles && roles.length > 0) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      userRoles = foundRoles.map((role) => role._id);
    } else {
      const defaultRole = await Role.findOne({ name: "user" });
      userRoles = [defaultRole._id];
    }

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      roles: userRoles,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User was registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).populate(
      "roles",
      "-__v"
    );

    if (!user) {
      return res.status(404).json({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res
        .status(401)
        .json({ accessToken: null, message: "Invalid Password!" });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: "HS256",
      expiresIn: 24 * 60 * 60, // 24 hours
    });

    const authorities = user.roles.map(
      (role) => "ROLE_" + role.name.toUpperCase()
    );

    return res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
