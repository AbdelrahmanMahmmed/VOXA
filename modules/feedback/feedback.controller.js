const feedBackService = require("./feedback.service");

class feedbackController {
  async Create(req, res, next) {
    try {
      const result = await feedBackService.CreateFeedBackInDb(req, req.body);
      res.json({
        result,
      });
    } catch (error) {
      next(error);
    }
  };

  async GetOne(req, res, next) {
    try {
      const result = await feedBackService.getFeedbackInDb(req.params.feedbackId);
      res.json({ result });
    } catch (error) {
      next(error);
    }
  };

  async GetAll(req, res, next) {
    try {
      const type = req.query.type;
      const result = await feedBackService.getAllFeedbackInDb(type);
      res.json({
        result,
      });
    } catch (error) {
      next(error);
    }
  };

  async DeleteOne(req, res, next) {
    try {
      const result = await feedBackService.deleteOneInDb(req.params.feedbackId);
      res.json({
        message: "Deleted Successflly",
      });
    } catch (error) {
      next(error);
    }
  };

  async DeleteMany(req, res, next) {
    try {
      const result = await feedBackService.deleteManyInDb();
      res.json({
        result,
      });
    } catch (error) {
      next(error);
    }
  };

  async UpdateIsResolved(req, res, next) {
    try {
      const result = await feedBackService.UpdateIsResolved(
        { isResolved: true },
        req.params.feedbackId,
      );
      res.json({
        message: "Updated is True",
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new feedbackController();