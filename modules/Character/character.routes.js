const express = require("express");
const CharacterController = require("./character.controller");
const { ProtectedRoters } = require("../../shared/middlewares/auth");
const { CreateCharacterValidator, vaildationCharacterId } = require("./character.validators");

const router = express.Router();

router.use(ProtectedRoters);
router.post("/", CreateCharacterValidator, CharacterController.Create);
router.get("/", CharacterController.GetAll);

router
  .route("/:id")
  .get(vaildationCharacterId, CharacterController.GetOne)
  .delete(vaildationCharacterId, CharacterController.Delete);

module.exports = router;
