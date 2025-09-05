const express = require("express");
const { Create, GetOne, GetAll, Delete } = require("./character.controller");
const { ProtectedRoters } = require("../../shared/middlewares/auth");
const {
  CreateCharacterValidator,
  vaildationCharacterId,
} = require("./character.validators");

const router = express.Router();

router.use(ProtectedRoters);

router.post("/", CreateCharacterValidator, Create);
router.get("/", GetAll);

router
  .route("/:id")
  .get(vaildationCharacterId, GetOne)
  .delete(vaildationCharacterId, Delete);

module.exports = router;
