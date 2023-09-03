const db = require("../models");
const Role = db.role;

const rolesSeeding = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count === 0) {
      await Promise.all([
        new Role({
          name: "user",
        }).save(),

        new Role({
          name: "moderator",
        }).save(),

        new Role({
          name: "admin",
        }).save(),
      ]);

      console.log("Added 'user', 'moderator', and 'admin' to roles collection");
    } else {
      console.log("Roles collection already populated");
    }
  } catch (err) {
    console.error("Error:", err);
  }
};

module.exports = rolesSeeding;
