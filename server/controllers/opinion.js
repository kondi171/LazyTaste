const opinionModel = require("../models/opinionModel");

exports.addOpinion = async (request, response) => {
  const opinion = new opinionModel(request.body);

  try {
    await opinion.save();
    response.send(opinion);
  } catch (error) {
    response.status(500).send(error);
  }
}

exports.showOpinions = async (request, response) => {
  const opinions = await opinionModel.find({});
  try {
    response.send(opinions);
  } catch (error) {
    response.status(500).send(error);
  }
}
