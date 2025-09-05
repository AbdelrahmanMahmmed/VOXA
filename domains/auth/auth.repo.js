const User = require("../user/user.model");

exports.saveUser = async (userData) => {
  const newUser = await User.create(userData);
  return newUser;
};

exports.findUserBy = async (key, value) => {
  return await User.findOne({ [key]: value });
};
