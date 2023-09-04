exports.allAccess = (_req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (_req, res) => {
  res.status(200).send("User Content.");
};

exports.moderatorBoard = (_req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.adminBoard = (_req, res) => {
  res.status(200).send("Admin Content.");
};
