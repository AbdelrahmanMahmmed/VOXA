const feedbackModel = require("./feedback.model");

class feedbackRepo {
  async CreateFeedback(DataFeedback) {
    return await feedbackModel.create(DataFeedback);
  };

  async getFeedBack(id) {
    return await feedbackModel
      .findById(id)
      .populate("user", "fName lName")
      .select("user message type rating");
  };

  async getAllFeedBack(type) {
    return await feedbackModel
      .find({ type: type, isResolved: false })
      .populate("user", "fName lName")
      .select("user message type rating");
  };

  async deleteOne(id) {
    return await feedbackModel.findByIdAndDelete(id);
  };

  async deleteMany() {
    return await feedbackModel.deleteMany({ isResolved: true });
  }

  async UpdatedResolved(data, id) {
    return await feedbackModel.findByIdAndUpdate(id, data);
  };

}
module.exports = new feedbackRepo();