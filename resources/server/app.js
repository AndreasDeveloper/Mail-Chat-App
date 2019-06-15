const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const handlebars = require("handlebars");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "handlebars");

mongoose.connect("mongodb://localhost:27017/mail-chat-app", {
  useNewUrlParser: true
});

const userRoutes = require("./routes/user");

const errors = require("./middleware/errors");
const CORS = require("./middleware/cors");

app.use(morgan("dev"));
app.use(CORS);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "..", "dist")));

app.get("/", (req, res) => {
  res.render(path.join(__dirname, "..", "..", "dist", "index"));
});

app.use("/user", userRoutes);

app.use(errors.error_not_found);

app.use(errors.error_not_caught);

module.exports = app;
