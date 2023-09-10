const clientConfig = {
  HOST: 'localhost',
  PORT: 8081,
};

module.exports = {
  ORIGIN: `http://${clientConfig.HOST}:${clientConfig.PORT}`,
};
