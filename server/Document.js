const { Schema, model } = require("mongoose");

const Document = new Schema({
  _id: String,
  name: String,
  data: Object,
  user_id: String,
});

module.exports = model("Document", Document);
