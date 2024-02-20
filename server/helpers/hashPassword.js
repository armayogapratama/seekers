const bcrypt = require("bcryptjs");

function signPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

function verifyPassword(planPassword, hash) {
  return bcrypt.compareSync(planPassword, hash);
}

module.exports = {
  signPassword,
  verifyPassword,
};
