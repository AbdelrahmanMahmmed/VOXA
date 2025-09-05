const router = require("express").Router();
const { ProtectedRoters } = require("../../shared/middlewares/auth");

const { createLink, getLinkMessages } = require("./chatLink.controller");
router.use(ProtectedRoters);

router.post("/create-link", createLink);
router.get("/:linkId", getLinkMessages);

module.exports = router;
