const brain = require('brain.js');
const fs = require('fs');
const data = require('../data.json');
const lazyAssistantModel = require("../models/lazyAssistantModel");

exports.predictRestaurant = async (req, res) => {
  const body = req.body;
  const customerID = req.body;
  const customerOrders = JSON.parse(body.customerOrders);
  const restaurants = JSON.parse(body.restaurants);
  console.log('Hello World!');
  let orderedProducts = '';
  let predictedRestaurantIndex = 0;
  customerOrders.forEach(order => order.products.forEach(product => orderedProducts += `${product.productName}, `));

  const randomRestaurant = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  const lazyAssistantData = await lazyAssistantModel.find({});
  const trainNeuralNetwork = () => {
    const network = new brain.recurrent.LSTM();
    const trainingData = lazyAssistantData.map(item => ({
      input: item.input,
      output: String(item.output),
    }));

    network.train(trainingData, {
      iterations: 300,
      log: true,
    });
    const output = network.run(orderedProducts);
    console.log(`Restaurant Type: ${output}`);
    return Number(output);
  }

  if (customerOrders.length !== 0 && restaurants.length !== 0) {
    const predictRestaurantType = () => {
      const predictedType = trainNeuralNetwork();
      const convertedTypeFromNumber = () => {
        if (predictedType === 0) return 'Kebab';
        else if (predictedType === 1) return 'Burgers';
        else if (predictedType === 2) return 'Chinease';
        else if (predictedType === 3) return 'Italian';
        else if (predictedType === 4) return 'Polish';
        else if (predictedType === 5) return 'Pizza';
        else if (predictedType === 6) return 'Thai';
        else if (predictedType === 7) return 'Vege';
        else if (predictedType === 8) return 'Sushi';
        else if (predictedType === 9) return 'Other';
        else return 'Error';
      }
      const convertedType = convertedTypeFromNumber();
      if (convertedType === 'Error') predictRestaurantType();
      else {
        const predictedRestaurants = restaurants.filter(restaurant => restaurant.type === convertedType);
        if (predictedRestaurants.length === 1) predictedRestaurantIndex = 0;
        else predictedRestaurantIndex = randomRestaurant(0, predictedRestaurants.length);
        return predictedRestaurants;
      }
    }
    let predictedRestaurants;
    if (lazyAssistantData) predictedRestaurants = predictRestaurantType();
    try {
      res.send(predictedRestaurants[predictedRestaurantIndex]);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    try {
      res.send({ error: 'Array is empty!' });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

exports.updateTrainingData = async (req, res) => {
  const { restaurantType, products } = req.body;
  const convertedTypeFromString = () => {
    if (restaurantType === 'Kebab') return 0;
    else if (restaurantType === 'Burgers') return 1;
    else if (restaurantType === 'Chinease') return 2;
    else if (restaurantType === 'Italian') return 3;
    else if (restaurantType === 'Polish') return 4;
    else if (restaurantType === 'Pizza') return 5;
    else if (restaurantType === 'Thai') return 6;
    else if (restaurantType === 'Vege') return 7;
    else if (restaurantType === 'Sushi') return 8;
    else if (restaurantType === 'Other') return 9;
  }
  const output = convertedTypeFromString();
  const lazyAssistantData = await lazyAssistantModel.findOne({ output: output });
  const currentData = lazyAssistantData.input;

  const filterNewData = currentData.search(products);
  console.log(filterNewData);
  if (filterNewData === -1) {
    const newData = currentData + products;
    await lazyAssistantModel.updateOne(
      { output: output },
      { input: newData }
    );
  }

  try {
    res.send('');
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.getTrainingData = async (req, res) => {
  const trainingData = await lazyAssistantModel.find({});
  try {
    res.send(trainingData);
  } catch (error) {
    res.status(500).send(error);
  }
}
