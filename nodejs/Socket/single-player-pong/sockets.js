let readyPlayerCount = 0;

function listen(io) {

    const pongNamespace = io.of("/pong");

    pongNamespace.on("connection", (socket) => {

        let room;

        console.log(`Client ${socket.id} connected`);

        socket.on("ready", () => {

            room = "room1" + Math.floor(readyPlayerCount / 2);
            socket.join(room);

            console.log("Player ready", socket.id, room);

            readyPlayerCount++;

            if (readyPlayerCount % 2 === 0) {
                // Start Game
                pongNamespace.in(room).emit("startGame", socket.id);
            }
        });

        socket.on("paddleMove", (paddleX) => {
            socket.to(room).emit("paddleMove", paddleX);
        });

        socket.on("ballMove", (ballData) => {
            socket.to(room).emit("ballMove", ballData);
        });

        socket.on("disconnect", (reason) => {
            // if (reson === "io server disconnect") {
            //     socket.connect();
            // }
            console.log(`Client ${socket.id} disconnected: ${reason}`);
            socket.leave(room);
        });
    });
}

module.exports = {
    listen,
}
