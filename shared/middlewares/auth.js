const jwt = require("jsonwebtoken");
const ApiError = require("../utils/APIError");
const User = require("../../domains/user/user.model");

exports.ProtectedRoters = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ApiError("You are not logged in", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await User.findById(decoded.userId);
  if (!user) {
    return next(new ApiError("User no longer exists", 401));
  }

  if (user.passwordChanagedAt) {
    const passChanagedTimestamp = parseInt(
      user.passwordChanagedAt.getTime() / 1000,
      10,
    );

    if (passChanagedTimestamp > decoded.iat) {
      return next(
        new ApiError("Your password has been changed, please login again", 401),
      );
    }
  }
  req.user = user;
  next();
};

exports.allwedTo =
  (...roles) =>
  async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You are not authorized to access this route", 403),
      );
    }
    next();
  };
