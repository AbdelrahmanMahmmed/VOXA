const slug = require("slugify");
const CharacterRepo = require("../../domains/Character/character.repo");
const { createId } = require("../../common/helpers/Generate");
const { generatePromot } = require("../../common/helpers/response");
const { findUserBy } = require("../../domains/auth/auth.repo");
const { AddLog } = require("../../log/log.controller");
const { getSpecialistMessage, getLanguageEnforcementMessage } = require("../../common/helpers/massage");
const Chat = require("../../domains/chat/chat.model");
const User = require("../../domains/user/user.model");
const Message = require("../../domains/message/message.model");
const { canCreateCharacter } = require("../../shared/middlewares/checklimitCharacter");

class CharacterService {
  async createCharacterInDB(characterData, req, res) {
    if (!canCreateCharacter(req.user))
      return res.status(403).json({ message: "Character limit reached for this month." });

    const User = await findUserBy("_id", req.user._id);

    const CharacterId = createId("CHARACTER", true, User.gender);
    const Slug = slug(characterData.name, { lower: true });
    const promot = await generatePromot(
      characterData.language,
      characterData.name,
      characterData.description,
      characterData.promot,
      characterData.personality,
    );

    const specialist = getSpecialistMessage(characterData.Specialist,characterData.language);
    const LanguageEnforcementMessage = getLanguageEnforcementMessage(characterData.language);

    const Character = await CharacterRepo.CreateCharacter({
      ...characterData,
      CharacterId,
      slug: Slug,
      UserId: req.user._id,
      promot:
        promot +
        "|Message Your Print:" +
        specialist +
        "|Message Your Print:" +
        LanguageEnforcementMessage,
    });

    req.user.createdCharactersThisMonth += 1;
    await req.user.save();

    if (User && Character && Character._id) {
      User.Characters.push(Character._id);
      await User.save();
    }
    await AddLog("createCharacter",req.user.UserId,"INFO",`Character created with Email: `,req.user.email,);
    return Character;
  };

  async getCharacterById(id) {
    const character = await CharacterRepo.GetCharacterById(id);
    return character;
  };

  async getAllCharacters(isPublished) {
    const characters = await CharacterRepo.GetAllCharacters(isPublished);
    return characters;
  };

  async DeleteCharacter(id) {
    const Character = await CharacterRepo.GetCharacterById(id);
    if (!Character) {
      throw new Error("Character not found");
    }

    await CharacterRepo.DeleteCharacter(id);

    const result = await Chat.deleteMany({ CharacterId: id });
    const DeletedMessages = await Message.deleteMany({ ReceiverId: id });
    const userResult = await User.updateMany(
      { Characters: id },
      { $pull: { Characters: id } },
    );

    return { message: "Character deleted successfully" };
  };
}

module.exports = new CharacterService();