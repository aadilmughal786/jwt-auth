const mongoose = require('mongoose');
const config = require('../../app/config/db.config.js');

const setupTestDB = () => {
  beforeAll(async () => {
    await mongoose.connect(config.URL);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
};

module.exports = setupTestDB;
