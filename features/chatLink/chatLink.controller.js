const { createChatLink, getMessagesBeforeLink } = require("./chatLink.service");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
exports.createLink = async (req, res) => {
  try {
    const { chatId, isPublic } = req.body;
    const userId = req.user._id;

    const link = await createChatLink(chatId, userId, isPublic);

    res.status(201).json({
      success: true,
      message: "Link created",
      link: `${process.env.FRONTEND_URL}/chat-link/${link.linkId}`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getLinkMessages = async (req, res) => {
  try {
    const { linkId } = req.params;

    const { link, messages } = await getMessagesBeforeLink(linkId);

    res.status(200).json({ success: true, link, messages });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
