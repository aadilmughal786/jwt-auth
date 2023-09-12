const mongoose = require('mongoose');
const config = require('../../app/config/db.config.js');

const setupTestDB = () => {
  beforeAll(async () => {
    await mongoose.connect(config.URL);
  });

  // beforeEach(async () => {
  //   await Promise.all(Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany()));
  // });

  afterAll(async () => {
    await mongoose.disconnect();
  });
};

module.exports = setupTestDB;
