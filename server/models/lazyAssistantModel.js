const mongoose = require("mongoose");

const LazyAssistantSchema = new mongoose.Schema({
  customerID: String,
  restaurantID: String,
  restaurantName: String,
  restaurantType: String,
  restaurantAvatar: String,
});

const LazyAssistant = mongoose.model("lazyAssistant", LazyAssistantSchema, 'lazyAssistant');

module.exports = LazyAssistant;