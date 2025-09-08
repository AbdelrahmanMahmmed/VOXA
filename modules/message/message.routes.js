const express = require("express");
const MessageController = require("./message.controller");
const { ProtectedRoters } = require("../../shared/middlewares/auth");
const { vaildationCharacterId, vaildationMessageId } = require("./message.validators");

const router = express.Router();

router.use(ProtectedRoters);

router
  .route("/:CharacterId")
  .post(vaildationCharacterId, MessageController.Create)
  .get(vaildationCharacterId, MessageController.GetAll);

router.use(vaildationMessageId);
router
  .route("/:id")
  .delete(MessageController.Delete)
  .get(MessageController.GetOne);

module.exports = router;
