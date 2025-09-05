const logModel = require("./log.model");
const { generateLogId, logger } = require("../core/logger");
exports.AddLog = async (functionName, UserId, level, message, UserEmail) => {
  try {
    const newLog = new logModel({
      LoggerId: generateLogId(functionName, UserId),
      loggerMassage: logger(level, message, UserEmail),
    });
    await newLog.save();
  } catch (error) {
    console.error("Error adding log:", error);
  }
};
