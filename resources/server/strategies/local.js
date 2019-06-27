const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

module.exports = new LocalStrategy((username, password, done) => {
  User.find({ username })
    .exec()
    .then(user => {
      if (user.length < 1) {
        done(null, false, { message: "This user does not exist!" });
      }
      //user[0].passoword is a hash agains which we are checking
      bcrypt.compare(password, user[0].password).then(response => {
        if (response) {
          done(null, { _id: user[0]._id });
        } else {
          done(null, false, { message: "Incorrect password." });
        }
      });
    })
    .catch(error => {
      done(error);
    });
});
