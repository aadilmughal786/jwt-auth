const dbConfig = require("./app/config/db.config");
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

const initial = async () => {
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

db.mongoose
  .connect(
    `mongodb+srv://${dbConfig.USER}:${dbConfig.PASSWARD}@cluster0.u8ccoc4.mongodb.net/${dbConfig.DB}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}.`);
});