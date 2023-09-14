const server = require('./server');
const serverConfig = require('./config/server.config');

// Set the port based on environment or configuration
const PORT = process.env.PORT || serverConfig.PORT;

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
