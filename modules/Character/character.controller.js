const {
  createCharacterInDB,
  getCharacterById,
  getAllCharacters,
  DeleteCharacter,
  UpdateCharacter,
} = require("./character.service");
const { CreateChat } = require("../../modules/chat/chat.controller");

exports.Create = async (req, res) => {
  try {
    const characterData = req.body;
    const newCharacter = await createCharacterInDB(characterData, req, res);

    await CreateChat(newCharacter._id, req, res);

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

exports.GetOne = async (req, res) => {
  try {
    const characterId = req.params.id;
    const character = await getCharacterById(characterId);
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

exports.GetAll = async (req, res) => {
  try {
    const { public } = req.query;
    const characters = await getAllCharacters(public);
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

exports.Delete = async (req, res) => {
  const characterId = req.params.id;
  try {
    const result = await DeleteCharacter(characterId);
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
