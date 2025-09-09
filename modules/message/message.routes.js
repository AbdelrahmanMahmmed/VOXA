const express = require("express");
const MessageController = require("./message.controller");
const { ProtectedRoters } = require("../../shared/middlewares/auth");
const { vaildationCharacterId, vaildationMessageId } = require("./message.validators");

const router = express.Router();

router.use(ProtectedRoters);

// Single Message by its ID
router
  .route("/:id")
  .get(vaildationMessageId, MessageController.GetOne)
  .delete(vaildationMessageId, MessageController.Delete);

// Messages related to a Character
router
  .route("/character/:CharacterId")
  .post(vaildationCharacterId, MessageController.Create)
  .get(vaildationCharacterId, MessageController.GetAll);

module.exports = router;