const morgan = require("morgan");
const chalk = require("chalk");

// Create a custom token for morgan that applies color to log messages
morgan.token("colored-status", (req, res) => {
  // Customize the color based on the HTTP status code
  const status = res.statusCode;
  let color = "green"; // Default to green for success

  if (status >= 400 && status < 500) {
    color = "yellow"; // Yellow for client errors (4xx)
  } else if (status >= 500) {
    color = "red"; // Red for server errors (5xx)
  }

  // Apply the color to the status code using chalk
  return chalk[color](status);
});

module.exports = morgan;
