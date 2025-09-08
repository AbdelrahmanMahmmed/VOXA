const express = require("express");
const feedBackController = require("./feedback.controller");
const { ProtectedRoters } = require("../../shared/middlewares/auth");
const {CreateFeedBackValidator,vaildationfeedbackId} = require("./feedback.validators");

const router = express.Router();

router.use(ProtectedRoters);

router
  .route("/")
  .post(CreateFeedBackValidator, feedBackController.Create)
  .delete(feedBackController.DeleteMany)
  .get(feedBackController.GetAll);

router
  .route("/:feedbackId")
  .get(vaildationfeedbackId, feedBackController.GetOne)
  .delete(vaildationfeedbackId, feedBackController.DeleteOne)
  .put(vaildationfeedbackId, feedBackController.UpdateIsResolved);

module.exports = router;
