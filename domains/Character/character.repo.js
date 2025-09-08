const Character = require("./character.model");

class CharacterRepo {

  async CreateCharacter(characterData) {
    const newCharacter = await Character.create(characterData);
    return newCharacter;
  };

  async GetCharacterById(id) {
    const character = await Character.findById(id)
      .populate({ path: "UserId", select: "fName lName role " })
      .select("UserId name promot isDeleted ChatId Specialist");
    return character;
  };

  async GetAllCharacters(isPublished) {
    const characters = await Character.find({
      isDeleted: false,
      isPublished: isPublished,
    }).select("characterId name promot -_id avatar Specialist");
    return characters;
  };

  async UpdateCharacter(id, characterData) {
    return await Character.findByIdAndUpdate(id, characterData, {
      new: true,
    });
  };

  async DeleteCharacter(id) {
    return await Character.findByIdAndDelete(id);
  };

}

module.exports = new CharacterRepo();