const db = require("../models");
const Role = db.role;

const rolesToSeed = ["user", "moderator", "admin"];

const seedRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count === 0) {
      const rolePromises = rolesToSeed.map((roleName) =>
        new Role({ name: roleName }).save()
      );

      await Promise.all(rolePromises);

      console.log("Roles collection populated with:", rolesToSeed.join(", "));
    } else {
      console.log("Roles collection already populated");
    }
  } catch (err) {
    console.error("Error:", err);
  }
};

module.exports = seedRoles;
