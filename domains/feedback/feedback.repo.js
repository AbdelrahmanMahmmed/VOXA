const feedbackModel = require("./feedback.model");
exports.CreateFeedback = async (DataFeedback) => {
  return await feedbackModel.create(DataFeedback);
};

exports.getFeedBack = async (id) => {
  return await feedbackModel
    .findById(id)
    .populate("user", "fName lName")
    .select("user message type rating");
};

exports.getAllFeedBack = async (type) => {
  return await feedbackModel
    .find({ type: type, isResolved: false })
    .populate("user", "fName lName")
    .select("user message type rating");
};

exports.deleteOne = async (id) => {
  return await feedbackModel.findByIdAndDelete(id);
};

exports.DeleteAllFeedBack = async () => {
  return await feedbackModel.deleteMany();
};

exports.UpdatedResolved = async (data, id) => {
  return await feedbackModel.findByIdAndUpdate(id, data);
};
