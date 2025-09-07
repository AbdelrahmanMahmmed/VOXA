const {
  getUserById,
  UpdateUserInDb,
  deleteUserInDb,
  getAllUsersInDb,
  GetAllCharactersInDb,
  uploadUserProfileImage,
  UpdateUserName,
} = require("./user.service");

exports.getUser = async (req, res, next) => {
  const userId = req.user._id || req.params.id;
  console.log(req.user._id);

  const User = await getUserById(userId);
  try {
    res.json({
      UserId: User.User.UserId,
      Name: User.User.name,
      Email: User.User.email,
      Avatar: User.User.avatar,
      Plan: User.User.plan,
      Characters: User.User.characters,
      Active: User.User.Active,
    });
  } catch (err) {
    next(err);
  }
};

exports.UpdateUser = async (req, res, next) => {
  const userId = req.user._id || req.params.id;
  console.log(req.user);
  const updateData = req.body;
  try {
    const updatedUser = await UpdateUserInDb(req, userId, updateData);
    res.json({
      message: "Updated successflly",
    });
  } catch (err) {
    next(err);
  }
};

exports.UpdateName = async (req, res, next) => {
  const userId = req.user._id || req.params.id;
  console.log(req.user);
  const updateData = req.body;
  try {
    const updatedUser = await UpdateUserName(req, userId, updateData);
    res.json({
      message: "Updated successflly",
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.user._id || req.params.id;
  try {
    const result = await deleteUserInDb(userId);
    res.json({
      message: "Deleted successflly",
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  try {
    const result = await getAllUsersInDb(page, limit);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.UpdateRoles = async (req, res, next) => {
  const userId = req.params.id;
  const role = req.body.role;
  try {
    const updatedUser = await UpdateUserInDb(req, userId, { role });
    res.json({
      UserId: updatedUser.User.UserId,
      Name: updatedUser.User.name,
      Role: updatedUser.User.role,
    });
  } catch (err) {
    next(err);
  }
};

exports.GetAllCharacters = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { isPublished } = req.query;

    const result = await GetAllCharactersInDb(userId, isPublished);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.uploadImageProfile = async (req, res) => {
  const response = await uploadUserProfileImage(req, req.file);
  res.status(200).json(response);
};

const userService = require("./user.service");

exports.sendVerification = async (req, res) => {
  try {
    const email = req.user.email;
    const message = await userService.sendVerificationEmail(email);
    res.json({ message });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.verify = async (req, res) => {
  try {
    const { token } = req.params;
    const message = await userService.verifyEmail(token);
    res.json({ message });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
