const express = require("express");
const app = express();
const lazyAssistantController = require('../controllers/lazyAssistant');

app.post("/API/lazy-assistant", lazyAssistantController.predictRestaurant);
app.patch("/API/lazy-assistant", lazyAssistantController.updateTrainingData);
app.get("/API/lazy-assistant", lazyAssistantController.getTrainingData)
module.exports = app;