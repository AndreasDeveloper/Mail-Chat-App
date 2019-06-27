const express = require("express");
const passport = require("passport");

const router = express.Router();

const UserController = require("../controllers/user");

router.post("/register", UserController.user_register);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

router.get("/logout", UserController.user_logout);

passport.serializeUser((_id, done) => {
  done(null, _id);
});

passport.deserializeUser((_id, done) => {
  done(null, _id);
});

module.exports = router;
