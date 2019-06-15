const http = require("http");

const app = require("./app");
const socketIO = require("./routes/socketio");

const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketIO.listen(server);

server.listen(port, () => console.log(`Server listening on port ${port}`));
