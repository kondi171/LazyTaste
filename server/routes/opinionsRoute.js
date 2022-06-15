const express = require("express");
const app = express();
const opinionController = require('../controllers/opinion');

app.put("/API/opinions", opinionController.addOpinion);

app.get("/API/opinions", opinionController.showOpinions);

module.exports = app;