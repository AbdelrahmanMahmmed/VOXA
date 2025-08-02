// const app = require("./app");

// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

// const PORT = process.env.PORT || 27017;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


const app = require("./app");
const http = require("http");
const { initSocket } = require("./interfaces/socket");

const server = http.createServer(app);

initSocket(server);

const PORT = process.env.PORT || 27017;
server.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});