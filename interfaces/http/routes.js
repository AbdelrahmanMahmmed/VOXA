const express = require("express");

const AuthRouters = require("../../modules/auth/auth.routes");
const UserRouters = require("../../modules/user/user.routes");
const CharacterRouters = require("../../modules/Character/character.routes");
const ChatRouters = require("../../modules/chat/chat.routes");
const ChatLinkRouters = require("../../features/chatLink/chatLink.route");
const MessageRouters = require("../../modules/message/message.routes");
const FeedBackRouters = require("../../modules/feedback/feedback.routes");

const router = express.Router();

router.use("/api/v1/auth", AuthRouters);
router.use("/api/v1/user", UserRouters);
router.use("/api/v1/character", CharacterRouters);
router.use("/api/v1/chat", ChatRouters);
router.use("/api/v1/chat", ChatLinkRouters);
router.use("/api/v1/message", MessageRouters);
router.use("/api/v1/feedback", FeedBackRouters);

module.exports = router;
