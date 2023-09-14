const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth.routes');
const clientConfig = require('./config/client.config');
const db = require('./models');
const dbConfig = require('./config/db.config');
const morgan = require('../morgan-config'); // Import the custom Morgan configuration
const rolesSeeding = require('./seed/role.seed');
const userRoutes = require('./routes/user.routes');

const server = express();

// Enable security headers with helmet
server.use(helmet());

// Enable gzip compression for responses
server.use(compression());

// Set up CORS for specific origins
const corsOptions = {
  origin: clientConfig.ORIGIN,
};
server.use(cors(corsOptions));

// Use morgan with the custom tokens
server.use(
  morgan(
    ':method :url :colored-status :response-time ms - :colored-ip - :user-agent'
  )
);

// Enable rate limiting to protect against abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
server.use(limiter);

// Parse JSON and URL-encoded requests
server.use(express.json());
server.use(express.urlencoded({extended: true}));

// Connect to MongoDB and seed roles
db.mongoose
  .connect(dbConfig.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connected to MongoDB.');
    rolesSeeding();
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit(1); // Exit the application on database connection failure
  });

// Define a root route
server.get('/', (req, res) => {
  res.json({message: 'Welcome to our production-ready application.'});
});

// Mount the routes
server.use('/api/auth', authRoutes);
server.use('/api/test', userRoutes);

module.exports = server;
