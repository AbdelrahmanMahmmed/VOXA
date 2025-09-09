const linkingService = require("./chatLink.service");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

class linkingController {
  async createLink(req, res) {
    try {
      const { chatId, isPublic } = req.body;
      const userId = req.user._id;

      const link = await linkingService.createChatLink(chatId, userId, isPublic);

      res.status(201).json({
        success: true,
        message: "Link created",
        link: `https://voxa-ruby.vercel.app/share/${link.linkId}`,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  async getLinkMessages(req, res) {
    try {
      const { linkId } = req.params;

      const { link, messages } = await linkingService.getMessagesBeforeLink(linkId);

      res.status(200).json({ success: true, link, messages });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  };
}
module.exports = new linkingController();