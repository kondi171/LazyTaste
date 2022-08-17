const mongoose = require("mongoose");

const LazyAssistantSchema = new mongoose.Schema({
  customerID: String,
  name: String,
  lastname: String,
  mail: String,
  orderedProducts: [
    {
      productName: String,
      productPrice: Number,
      productDescription: String,
    }
  ],
});

const LazyAssistant = mongoose.model("lazyAssistant", LazyAssistantSchema, 'lazyAssistant');

module.exports = LazyAssistant;