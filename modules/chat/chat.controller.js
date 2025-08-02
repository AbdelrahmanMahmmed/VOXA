const { CreateChat, GetChat, deleteChatData } = require('./chat.service');
const { GetCharacterById } = require('../../domains/Character/character.repo');

exports.CreateChat = async (CharacterId, req, res) => {
    const characterId = await GetCharacterById(CharacterId);
    if (!characterId) return res.status(404).json({ message: 'Character not found' });
    try {
        const chat = await CreateChat(characterId.name, CharacterId, req.user._id);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.GetOne = async (req, res) => {
    const ChatId = req.params.id;
    const result = await GetChat(ChatId);
    if (!result) return res.status(404).json({ message: 'Chat not found' });
    res.status(200).json(result);
}

exports.DeleteChat = async (req, res, next) => {
    try {
        const chatId = req.params.id;
        const result = await deleteChatData(chatId);

        res.json({
            status: "success",
            message: result.message
        });
        
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message || "An error occurred while deleting the chat"
        });
    }
};