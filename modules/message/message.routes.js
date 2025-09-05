const express = require("express");
const { Create, Delete, GetAll } = require("./message.controller");
const { ProtectedRoters } = require("../../shared/middlewares/auth");
const {
  vaildationCharacterId,
  vaildationMessageId,
} = require("./message.validators");

const router = express.Router();

router.use(ProtectedRoters);

router
  .route("/:CharacterId")
  .post(vaildationCharacterId, Create)
  .get(vaildationCharacterId, GetAll);

router.delete("/:id", vaildationMessageId, Delete);

module.exports = router;
