const mongoose = require("mongoose");

const LazyAssistantSchema = new mongoose.Schema({
  input: String,
  output: Number,
});

const LazyAssistant = mongoose.model("lazyAssistant", LazyAssistantSchema, 'lazyAssistant');

module.exports = LazyAssistant;