// const request = require('supertest');
// const {faker} = require('@faker-js/faker');
// const httpStatus = require('http-status');
// const server = require('../../app/server');
const setupTestDB = require('../utils/setupTestDB');
// const {User} = require('../../app/models/user.model');
// const {
//   userOne,
//   userTwo,
//   admin,
//   insertUsers,
// } = require('../fixtures/user.fixture');
// const {
//   userOneAccessToken,
//   adminAccessToken,
// } = require('../fixtures/token.fixture');

setupTestDB();

describe('Auth routes', () => {
  describe('Create user', () => {
    // let newUser;

    beforeEach(() => {
      // newUser = {
      //   username: faker.person.fullName(),
      //   email: faker.internet.email().toLowerCase(),
      //   password: 'password1',
      //   role: [],
      // };
    });

    test('should return 201 and successfully create new user if data is ok', async () => {
      // const res = await request(server)
      //   .post('/api/auth/signup')
      //   .send(newUser)
      //   .expect(httpStatus.CREATED);
      // expect(res.body).not.toHaveProperty('password');
      // expect(res.body).toEqual({
      //   id: expect.anything(),
      //   name: newUser.name,
      //   email: newUser.email,
      //   role: newUser.role,
      //   isEmailVerified: false,
      // });
      // const dbUser = await User.findById(res.body.id);
      // expect(dbUser).toBeDefined();
      // expect(dbUser.password).not.toBe(newUser.password);
      // expect(dbUser).toMatchObject({
      //   name: newUser.name,
      //   email: newUser.email,
      //   role: newUser.role,
      //   isEmailVerified: false,
      // });
    });
  });
});
