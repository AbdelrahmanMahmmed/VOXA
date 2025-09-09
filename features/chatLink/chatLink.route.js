const router = require("express").Router();
const { ProtectedRoters } = require("../../shared/middlewares/auth");

const linkingController = require("./chatLink.controller");
router.use(ProtectedRoters);

router.post("/create-link", linkingController.createLink);
router.get("/share/:linkId", linkingController.getLinkMessages);

module.exports = router;
