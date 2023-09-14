const Role = require('../../app/models/role.model');
const {ROLES} = require('../../app/constants');
const seedRoles = require('../../app/seed/role.seed');

it('ROLES should contain users,admin,moderator', () => {
  expect(ROLES).toEqual(['user', 'admin', 'moderator']);
});

describe('Seeding Roles', () => {
  it('Should Pupulate the Roles collection if is empty', async () => {
    Role.estimatedDocumentCount = jest.fn().mockReturnValue(0);
    const consoleSpy = jest.spyOn(console, 'log');
    await seedRoles();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Roles collection populated with:',
      'user, admin, moderator'
    );
  });

  it('should not populate the Roles collection when it is not empty', async () => {
    Role.estimatedDocumentCount = jest.fn().mockReturnValue(3);
    const consoleSpy = jest.spyOn(console, 'log');
    await seedRoles();

    expect(Role.estimatedDocumentCount).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Roles collection already populated'
    );
  });
});
