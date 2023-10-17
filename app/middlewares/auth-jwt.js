const jwt = require('jsonwebtoken');
const config = require('../config.sample/auth.config');
const {user: User, role: Role} = require('../models/index');

exports.accessToken = async (payloadData) => {
  try {
    const JWT_ACCESS_TOKEN_SECRET = config.JWT_ACCESS_TOKEN_SECRET;
    if (!JWT_ACCESS_TOKEN_SECRET) {
      console.error('Unable to process Constant [JWT_ACCESS_TOKEN_SECRET]');
      return null;
    }
    const jwtSecretKey = JWT_ACCESS_TOKEN_SECRET;
    const jwtConfigOptions = {
      expiresIn: config.JWT_ACCESS_EXPIRES_IN,
      algorithm: config.ALGORITHM,
    };
    const jwtToken = await jwt.sign(
      payloadData,
      jwtSecretKey,
      jwtConfigOptions
    );
    return jwtToken;
  } catch (error) {
    console.error(error);
  }
};

exports.refreshToken = async (payloadData) => {
  try {
    const JWT_REFRESH_TOKEN_SECRET = config.JWT_REFRESH_TOKEN_SECRET;
    if (!JWT_REFRESH_TOKEN_SECRET) {
      console.error('Unable to process Constant [JWT_REFRESH_TOKEN_SECRET]');
      return null;
    }
    const jwtSecretKey = JWT_REFRESH_TOKEN_SECRET;
    const jwtConfigOptions = {
      expiresIn: config.JWT_REFRESH_EXPIRES_IN,
      algorithm: config.ALGORITHM,
    };
    const refreshToken = await jwt.sign(
      payloadData,
      jwtSecretKey,
      jwtConfigOptions
    );
    return refreshToken;
  } catch (error) {
    console.error(error);
  }
};

// Verify the JWT token provided in the request headers
exports.verifyAccessToken = (req, res, next) => {
  try {
    const accessTokenHeader = req.get('access_Token');
    if (!accessTokenHeader) {
      return res.status(403).send({message: 'No token provided!'});
    }
    jwt.verify(
      accessTokenHeader,
      config.JWT_ACCESS_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          return res.status(401).send({message: 'Unauthorized!'});
        }
        req.userId = decoded.id;
        next();
      }
    );
  } catch (error) {
    console.error(error);
  }
};

// Verify the JWT refresh token provided in the request headers
exports.verifyRefreshToken = (req, res, next) => {
  try {
    const refreshTokenHeader = req.get('refresh_Token');
    if (!refreshTokenHeader) {
      console.log('Unable to process Constant [refreshTokenHeader]');
    }
    jwt.verify(
      refreshTokenHeader,
      config.JWT_REFRESH_TOKEN_SECRET,
      (err, payload) => {
        if (err) {
          return res.status(401).send({message: 'Unauthorized!'});
        }
        req.payload = payload;
        next();
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// Check if the user is an admin
exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({message: 'User not found.'});
    }

    const roles = await Role.find({_id: {$in: user.roles}});

    if (!roles.some((role) => role.name === 'admin')) {
      return res.status(403).json({message: 'Require Admin Role!'});
    }

    next();
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
};

// Check if the user is a moderator
exports.isModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({message: 'User not found.'});
    }

    const roles = await Role.find({_id: {$in: user.roles}});

    if (!roles.some((role) => role.name === 'moderator')) {
      return res.status(403).json({message: 'Require Moderator Role!'});
    }

    next();
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
};
