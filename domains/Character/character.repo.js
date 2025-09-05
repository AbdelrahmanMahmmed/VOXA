const Character = require("./character.model");

exports.CreateCharacter = async (characterData) => {
  const newCharacter = await Character.create(characterData);
  return newCharacter;
};

exports.GetCharacterById = async (id) => {
  const character = await Character.findById(id)
    .populate({ path: "UserId", select: "fName lName role " })
    .select("UserId name promot isDeleted ChatId Specialist");
  return character;
};

exports.GetAllCharacters = async (isPublished) => {
  const characters = await Character.find({
    isDeleted: false,
    isPublished: isPublished,
  }).select("characterId name promot -_id avatar Specialist");
  return characters;
};

exports.UpdateCharacter = async (id, characterData) => {
  return await Character.findByIdAndUpdate(id, characterData, {
    new: true,
  });
};

exports.DeleteCharacter = async (id) => {
  return await Character.findByIdAndDelete(id);
};
