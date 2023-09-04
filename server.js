const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const clientConfig = require("./app/config/client.config");
const db = require("./app/models");
const dbConfig = require("./app/config/db.config");
const rolesSeeding = require("./app/seed/role.seed");
const serverConfig = require("./app/config/server.config");

const app = express();

// Enable security headers with helmet
app.use(helmet());

// Enable gzip compression for responses
app.use(compression());

// Set up CORS for specific origins
const corsOptions = {
  origin: clientConfig.ORIGIN,
};
app.use(cors(corsOptions));

// Enable request logging (you can customize the format)
app.use(morgan("combined"));

// Enable rate limiting to protect against abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Parse JSON and URL-encoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB and seed roles
db.mongoose
  .connect(dbConfig.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    rolesSeeding();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit(1); // Exit the application on database connection failure
  });

// Define a root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to your production-ready application." });
});

// Load routes and controllers
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// Set the port based on environment or configuration
const PORT = process.env.PORT || serverConfig.PORT;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
