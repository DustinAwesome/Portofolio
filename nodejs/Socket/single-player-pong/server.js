const http = require("http");
const socket = require("socket.io");
const { listen } = require("./sockets");
const api = require("./api");

const server = http.createServer(api);
const socketServer = socket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

listen(socketServer);
