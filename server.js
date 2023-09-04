const dbConfig = require("./app/config/db.config");
const clientConfig = require("./app/config/client.config");
const serverConfig = require("./app/config/server.config");
const db = require("./app/models");
const express = require("express");
const rolesSeeding = require("./app/seed/role.seed");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: clientConfig.ORIGIN,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.mongoose
  .connect(dbConfig.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    rolesSeeding();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
app.listen(serverConfig.PORT, () => {
  console.log(`Server is running at ${serverConfig.ORIGIN}.`);
});
