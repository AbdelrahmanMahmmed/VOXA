const bcrypt = require("bcryptjs");
const crypto = require("crypto");

exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

exports.comparePassword = async (plain, hashed) => {
  return await bcrypt.compare(plain, hashed);
};
exports.hashNumber = async (number) => {
  return crypto.createHash("sha256").update(number).digest("hex");
};
