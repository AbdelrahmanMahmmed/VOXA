const User = require("./user.model");

exports.getUser = async (id) => {
  return await User.findById(id);
};

exports.updateUser = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, {
    new: true,
  });
};

exports.getAllUsers = async (page, limit) => {
  const skip = (page - 1) * limit;

  const users = await User.find({ IsDeleted: false })
    .skip(skip)
    .limit(limit)
    .select("userId fName lName email role -_id");

  const total = await User.countDocuments({ IsDeleted: false });

  return {
    totalUsers: total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    users,
  };
};

exports.updateUserPlan = async (userId, plan) => {
  return await User.findByIdAndUpdate(userId, { plan }, { new: true });
};
