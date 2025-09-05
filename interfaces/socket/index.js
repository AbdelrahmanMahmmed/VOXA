const { Server } = require("socket.io");
const { CreateMessage } = require("../../modules/message/message.service");

let io;

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("joinChat", (chatId) => {
      socket.join(chatId);
      console.log(`Socket ${socket.id} joined chat ${chatId}`);
    });

    socket.on("sendMessage", async (data) => {
      try {
        const message = await CreateMessage(
          data.chatId,
          data.characterId,
          data.content,
        );
        io.to(data.chatId).emit("newMessage", message);
      } catch (err) {
        socket.emit("errorMessage", err.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}

function getIO() {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
}

module.exports = {
  initSocket,
  getIO,
};
