const express = require("express");
const app = express();
const lazyAssistantController = require('../controllers/lazyAssistant');

app.put("/API/lazy-assistant", lazyAssistantController.trainNetwork);

module.exports = app;