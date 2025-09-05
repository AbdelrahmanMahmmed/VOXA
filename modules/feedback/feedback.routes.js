const express = require("express");
const {
  Create,
  DeleteMany,
  GetOne,
  GetAll,
  DeleteOne,
  UpdateIsResolved,
} = require("./feedback.controller");
const { ProtectedRoters } = require("../../shared/middlewares/auth");
const {
  CreateFeedBackValidator,
  vaildationfeedbackId,
} = require("./feedback.validators");

const router = express.Router();

router.use(ProtectedRoters);

router
  .route("/")
  .post(CreateFeedBackValidator, Create)
  .delete(DeleteMany)
  .get(GetAll);

router
  .route("/:feedbackId")
  .get(vaildationfeedbackId, GetOne)
  .delete(vaildationfeedbackId, DeleteOne)
  .put(vaildationfeedbackId, UpdateIsResolved);

module.exports = router;
