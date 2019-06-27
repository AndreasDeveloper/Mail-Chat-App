//Package includes
const path = require("path");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const handlebars = require("handlebars");
const viewEngine = require("hbs");
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv").config();

//Passport strategy configurations
const localStrategy = require("./strategies/local");

//Router includes
const userRoutes = require("./routes/user");

//Model includes
const User = require("./models/user");

//Midddleware includes
const errors = require("./middleware/errors");
const CORS = require("./middleware/cors");
const authenticate = require("./middleware/auth");

const app = express();
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../views"));

//Connect to MongoDB with Mongoose
mongoose.connect("mongodb://localhost:27017/mail-chat-app", {
  useNewUrlParser: true
});

//Static files
app.use(express.static(path.join(__dirname, "..", "..", "dist")));

//Middlewares
app.use(morgan("dev"));
app.use(CORS);
app.use(bodyParser.json());
app.use(cookieParser());

//Session setup
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Root route
app.get("/", (req, res) => {
  res.render(path.join(__dirname, "..", "..", "dist", "index"));
});

app.get("/register", (req, res) => {
  res.render("register", {
    placeholder: "You will register here once we are ready!"
  });
});

app.get("/login", (req, res) => {
  res.render("register", {
    placeholder: "You will log in here once we are ready!"
  });
});

app.get("/profile", authenticate(), (req, res) => {
  res.render("profile", {
    placeholder: "You need to see your profile once we are ready!"
  });
});

//User router
app.use("/user", userRoutes);

//Set up password strategy for username-password login
passport.use(localStrategy);

//Error handling middlwares
app.use(errors.error_not_found);

app.use(errors.error_not_caught);

module.exports = app;
