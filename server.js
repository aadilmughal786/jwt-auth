const chalk = require("chalk");
const compression = require("compression");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./app/routes/auth.routes");
const clientConfig = require("./app/config/client.config");
const db = require("./app/models");
const dbConfig = require("./app/config/db.config");
const morgan = require("./morgan-config"); // Import the custom Morgan configuration
const rolesSeeding = require("./app/seed/role.seed");
const serverConfig = require("./app/config/server.config");
const userRoutes = require("./app/routes/user.routes");

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

// Use morgan with the custom tokens
app.use(
  morgan(":method :url :colored-status :response-time ms - :colored-ip - :user-agent")
);

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
  res.json({ message: "Welcome to our production-ready application." });
});

// Mount the routes
app.use("/api/auth", authRoutes);
app.use("/api/test", userRoutes);

// Set the port based on environment or configuration
const PORT = process.env.PORT || serverConfig.PORT;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
