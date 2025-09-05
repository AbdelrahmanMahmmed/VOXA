const { DeleteAllFeedBack } = require("../../domains/feedback/feedback.repo");
const {
  CreateFeedBackInDb,
  getFeedbackInDb,
  getAllFeedbackInDb,
  deleteOneInDb,
  UpdateIsResolved,
} = require("./feedback.service");

exports.Create = async (req, res, next) => {
  try {
    const result = await CreateFeedBackInDb(req, req.body);
    res.json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

exports.GetOne = async (req, res, next) => {
  try {
    const result = await getFeedbackInDb(req.params.feedbackId);
    res.json({ result });
  } catch (error) {
    next(error);
  }
};

exports.GetAll = async (req, res, next) => {
  try {
    const type = req.query.type;
    const result = await getAllFeedbackInDb(type);
    res.json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

exports.DeleteOne = async (req, res, next) => {
  try {
    const result = await deleteOneInDb(req.params.feedbackId);
    res.json({
      message: "Deleted Successflly",
    });
  } catch (error) {
    next(error);
  }
};

exports.DeleteMany = async (req, res, next) => {
  try {
    const result = await DeleteAllFeedBack();
    res.json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

exports.UpdateIsResolved = async (req, res, next) => {
  try {
    const result = await UpdateIsResolved(
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
