const { Schema, model } = require("mongoose");

const User = new Schema({
  _id: String,
  recents: [String],
});

module.exports = model("User", User);
