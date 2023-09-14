const dbConfig = {
  USER: 'user-name',
  PASSWORD: 'password',
  DB: 'db-name',
};

module.exports = {
  URL: `mongodb+srv://${dbConfig.USER}:${dbConfig.PASSWORD}@cluster123.xyz.mongodb.net/${dbConfig.DB}`,
};
