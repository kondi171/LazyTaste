const mongoose = require("mongoose");

const OpinionSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    default: 'none',
  },
  rate: {
    type: Number,
    required: true,
    default: 0,
  },
  content: {
    type: String,
    required: true,
    default: 'none',
  }
});

const Opinion = mongoose.model("Opinion", OpinionSchema);

module.exports = Opinion;