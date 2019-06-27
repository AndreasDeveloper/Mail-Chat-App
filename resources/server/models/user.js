const mongoose = require("mongoose");
const Media = require("../models/media");

const userSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Empty _id is not allowed!"]
  },
  first_name: { type: String, required: false },
  last_name: { type: String, required: false },
  phone_number: { type: String, required: false },
  email: {
    type: String,
    required: [true, "Empty email is not allowed"],
    unique: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  username: {
    type: String,
    required: [true, "Empty username is not allowed"],
    unique: true,
    match: /^[a-zA-Z0-9]/,
    minlength: 8,
    maxlength: 25
  },
  password: {
    type: String,
    required: [true, "Empty password is not allowed!"],
    match: /^[a-zA-Z0-9!@#$%^&* !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/
  },
  userMedia: [Media.schema],
  favs: [mongoose.Schema.Types.ObjectId]
});

//Static method that's used to check do
//email and username exist before registring the user
userSchema.statics.checkField = function(field, value) {
  return new Promise((resolve, reject) => {
    this.find({ [field]: value })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          const error = new Error(
            `A user with ${field} of value "${value}" already exists!`
          );
          error.status = 409;
          reject(error);
        } else {
          resolve();
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = mongoose.model("User", userSchema);
