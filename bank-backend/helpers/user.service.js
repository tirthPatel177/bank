const config = require("../config.json");
const jwt = require("jsonwebtoken");
const Role = require("./role");
const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports = {
  authenticate,
  getAll,
  getById,
};

async function authenticate({ username, password }) {
  const user = await User.findOne({ email: username });
  console.log(user, "NOOO");
  if (user && bcrypt.compareSync(password, user.hash)) {
    const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
    const { hash, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      token,
    };
  }
}

async function getAll(users) {
  return users.map((u) => {
    const { hash, ...userWithoutPassword } = u;
    return userWithoutPassword;
  });
}

async function getById(users, id) {
  const user = users.find((u) => u.id === parseInt(id));
  if (!user) return;
  const { hash, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
