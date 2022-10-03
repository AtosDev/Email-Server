const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MemberSchema = new Schema({
  address: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Member = mongoose.model("members", MemberSchema);

