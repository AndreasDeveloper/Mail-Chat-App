const path = require("path");
const bodyParser = require("body-parser");
const handlebars = require("handlebars");
const http = require("http");
const socketIO = require("./routes/socketio");
const express = require("express");
const port = process.env.PORT || 3000;
const app = express(),
  server = http.createServer(app),
  io = socketIO.listen(server);

app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "..", "dist")));

app.get("/", (req, res) => {
  res.render(path.join(__dirname, "..", "..", "dist", "index"));
});

app.get("*", (req, res) => {
  res.status(404).send("404 - File not found");
});

server.listen(port, () => console.log(`Server listening on port ${port}`));
