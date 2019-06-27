const mongoose = require("mongoose");

const mediaSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  from: { type: mongoose.Schema.Types.ObjectId, required: true },
  to: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
  location: { type: String, required: true },
  type: { type: String, required: true },
  name: { type: String, required: true }
});

module.exports = mongoose.model("Media", mediaSchema);
