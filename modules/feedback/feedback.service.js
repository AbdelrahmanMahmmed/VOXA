const feedBackRepo = require("../../domains/feedback/feedback.repo");

class feedbackService {

  async CreateFeedBackInDb(req, data) {
    const UserId = req.user._id;
    const FeedBack = await feedBackRepo.CreateFeedback({
      ...data,
      user: UserId,
    });
    return FeedBack;
  };

  async getFeedbackInDb(id) {
    const feedback = await feedBackRepo.getFeedBack(id);
    if (!feedback) throw new Error("the feedback not exist");
    if (feedback.isResolved) throw new Error("The Problem is Solved");
    return feedback;
  };

  async getAllFeedbackInDb(type) {
    const FeedBacks = await feedBackRepo.getAllFeedBack(type);
    return FeedBacks;
  };

  async deleteOneInDb(id) {
    const feedback = await feedBackRepo.deleteOne(id);
    return feedback;
  };

  async deleteManyInDb() {
    const FeedBacks = await feedBackRepo.deleteMany();
    return FeedBacks;
  };

  async UpdateIsResolved(isResolved, id) {
    const feedback = await feedBackRepo.UpdatedResolved(isResolved, id);
    return feedback;
  };

}

module.exports = new feedbackService();