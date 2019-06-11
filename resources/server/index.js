const path = require("path");
const bodyParser = require("body-parser");
const http = require("http");
const socketIO = require("./routes/socketio");
const express = require("express");
const port = process.env.PORT || 3000;
const app = express(),
  server = http.createServer(app),
  io = socketIO.listen(server);

app.get("/", (req, res) => {
  res.render(path.join(__dirname, "..", "html", "index.html"));
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..")));

server.listen(port, () => console.log(`Server listening on port ${port}`));
