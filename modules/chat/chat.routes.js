const express = require("express");
const chatController = require("./chat.controller");
const { ProtectedRoters } = require("../../shared/middlewares/auth");
const { vaildationChatId } = require("./chat.validators");

const router = express.Router();

router.use(ProtectedRoters);
router
  .route("/:id")
  .get(vaildationChatId, chatController.GetOne)

module.exports = router;
