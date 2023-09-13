const request = require('supertest');
const {faker} = require('@faker-js/faker');
const httpStatus = require('http-status');
const app = require('../../app/server');
const setupTestDB = require('../utils/setup-db.test');

setupTestDB();

describe('Auth routes', () => {
  describe('Create user', () => {
    test('should return 201 http status and return successfully message', async () => {
      const newUser = {
        username: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: 'password1',
        role: [],
      };

      const res = await request(app)
        .post('/api/auth/signup')
        .send(newUser)
        .expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        message: 'User was registered successfully!',
      });
    });
  });
});
