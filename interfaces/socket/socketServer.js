const { Server } = require("socket.io");

const { CreateMessage } = require("../../modules/message/message.service");

function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New user connected:", socket.id);

    socket.on("join-chat", (chatId) => {
      socket.join(chatId);
      console.log(`User ${socket.id} joined chat ${chatId}`);
    });

    socket.on("send-message", async ({ ChatId, CharacterId, content }) => {
      try {
        const message = await CreateMessage(ChatId, CharacterId, content);

        io.to(ChatId).emit("new-message", {
          _id: message._id,
          ChatId: message.ChatId,
          SenderId: message.SenderId,
          ReceiverId: message.ReceiverId,
          content: message.content,
          Response: message.Response,
          createdAt: message.createdAt,
        });
      } catch (err) {
        socket.emit("error-message", {
          message: err.message || "Error sending message",
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}

module.exports = { setupSocket };
