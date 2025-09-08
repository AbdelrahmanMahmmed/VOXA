const characterService = require("./character.service");
const chatController = require("../../modules/chat/chat.controller");

class CharacterController {
  async Create(req, res) {
    try {
      const characterData = req.body;
      const newCharacter = await characterService.createCharacterInDB(characterData, req, res);

      await chatController.CreateChat(newCharacter._id, req, res);

      return res.status(201).json({
        success: true,
        message: "Character created successfully",
        data: newCharacter,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Error creating character",
      });
    }
  };

  async GetOne(req, res) {
    try {
      const characterId = req.params.id;
      const character = await characterService.getCharacterById(characterId);
      if (!character || character.isDeleted) {
        return res.status(404).json({
          success: false,
          message: "Character not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: character,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error fetching character",
        error: error.message,
      });
    }
  };

  async GetAll(req, res) {
    try {
      const { IsPublic } = req.query;
      const characters = await characterService.getAllCharacters(IsPublic);
      return res.status(200).json({
        success: true,
        data: characters,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error fetching characters",
        error: error.message,
      });
    }
  };


  async Delete(req, res) {
    const characterId = req.params.id;
    try {
      const result = await characterService.DeleteCharacter(characterId);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error deleting character",
        error: error.message,
      });
    }
  };
}

module.exports = new CharacterController();