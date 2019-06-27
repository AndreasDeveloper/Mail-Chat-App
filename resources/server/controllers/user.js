const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/user");

const user_register = (req, res, next) => {
  const { data } = req.body;
  const { email, username, password } = data;

  //Check if user with this emails already exists
  User.checkField("email", email)
    .then(() => {
      //Check if user with this username already exists
      return User.checkField("username", username);
    })
    .then(() => {
      //Hash password
      return bcrypt.hash(password, 10).then(hash => hash);
    })
    .then(hash => {
      //Create Id for new user
      const _id = new mongoose.Types.ObjectId();
      //Create new users
      const user = new User({
        _id, //Created Id
        first_name: "Unknown", //Placeholders in case it was not set in data
        last_name: "Unknown",
        phone_number: "Unknown",
        ...data, //Setting data
        password: hash //Setting password to hash, it's set here so that it overwrites password in data
      });

      return user.save().then(user => user); //Save user to database
    })
    .then(user => {
      //Log the user in and redirect him to home page
      req.login(user._id, err => {
        res.redirect("/");
      });

      //Will later redirect user to please confirm page and send him an emailyyyyyy
      //res.redirect(`/confirm`) + send new uuidv4() to user's email
    })
    .catch(error => {
      //Default error code = server error
      let status = 500;
      if (error.status) status = 409;
      res.status(status).json({ error: { message: error.message } });
    });
};

const user_logout = (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
};

module.exports = {
  user_register,
  user_logout
};
