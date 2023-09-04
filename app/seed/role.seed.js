const { ROLES } = require("../constants");
const { role: Role } = require("../models");

const seedRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count === 0) {
      const rolePromises = ROLES.map((roleName) =>
        new Role({ name: roleName }).save()
      );

      await Promise.all(rolePromises);

      console.log("Roles collection populated with:", ROLES.join(", "));
    } else {
      console.log("Roles collection already populated");
    }
  } catch (err) {
    console.error("Error:", err);
  }
};

module.exports = seedRoles;
