const { App } = require("uWebSockets.js");
const { Server } = require("socket.io");

const app = new App();
const io = new Server();
const PORT = process.eventNames.PORT || 3002;

io.attachApp(app);

io.on("connection", (socket) => {
  // ...
});

app.listen(PORT, (token) => {
  if (!token) {
    console.warn("port already in use");
  }
});