const ChatModel = require("../../domains/chat/chat.model");
const User = require("../../domains/user/user.model");
const Character = require("../../domains/Character/character.model");
const Message = require("../../domains/message/message.model");
const { getChat, deleteChat } = require("../../domains/chat/chat.repo");
const { getUser } = require("../../domains/user/user.repo");
const { GetCharacterById } = require("../../domains/Character/character.repo");
exports.CreateChat = async (title, CharacterId, UserId) => {
  const user = await getUser(UserId);

  const isCharacterExists = user.Characters.includes(CharacterId);
  if (!isCharacterExists) {
    throw new Error("Character does not belong to the user");
  }

  const chat = new ChatModel({
    title: title,
    CharacterId: CharacterId,
    UserId: UserId,
  });

  const Character = await GetCharacterById(CharacterId);
  Character.ChatId = chat._id;
  await Character.save();

  try {
    const savedChat = await chat.save();
    return savedChat;
  } catch (error) {
    throw new Error("Error creating chat: " + error.message);
  }
};
exports.GetChat = async (id) => {
  try {
    return await getChat(id)
      .select("-_id -createdAt -updatedAt -__v")
      .populate("UserId", "fName lName -_id")
      .populate("CharacterId", "name -_id");
  } catch (error) {
    throw new Error("Error retrieving chat: " + error.message);
  }
};

exports.GetAllChats = async () => {};

exports.deleteChatData = async (id) => {
  // await Chat.deleteOne({ _id: id });
  await deleteChat(id);
  await Message.deleteMany({ ChatId: id });
  await Character.deleteMany({ ChatId: id });

  return {
    message: "Deleted Done",
  };
};
