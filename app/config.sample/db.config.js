const dbConfig = {
  USER: 'user-name',
  PASSWARD: 'password',
  DB: 'db-name',
};

module.exports = {
  URL: `mongodb+srv://${dbConfig.USER}:${dbConfig.PASSWARD}@cluster123.xyz.mongodb.net/${dbConfig.DB}`,
};
