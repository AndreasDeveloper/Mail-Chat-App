const socketIO = require("socket.io");

module.exports.listen = app => {
  io = socketIO.listen(app);

  users = io.of("/users");

  users.on("connection", socket => {
    socket.emit("connected", { id: socket.id });
  });
};
