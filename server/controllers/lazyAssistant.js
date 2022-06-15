const brain = require('brain.js');
const data = require('../data.json');
const lazyAssistantModel = require("../models/lazyAssistantModel");

exports.trainNetwork = async (req, res) => {
  const body = req.body;
  const customerID = req.body;
  const customerOrders = JSON.parse(body.customerOrders);
  const restaurants = JSON.parse(body.restaurants);
  if (customerOrders.length !== 0 && restaurants.length !== 0) {
    const network = new brain.recurrent.LSTM();
    const trainingData = data.map(item => ({
      input: item.text,
      output: item.category,
    }));
    let predictedRestaurantIndex = 0;
    const convertOrders = customerOrders.map(order => order.restaurantType);
    const selectLargestQuantity = array => {
      if (array.length == 0)
        return null;
      let modeMap = {};
      let maxEl = array[0], maxCount = 1;
      for (let i = 0; i < array.length; i++) {
        let el = array[i];
        if (modeMap[el] == null)
          modeMap[el] = 1;
        else
          modeMap[el]++;
        if (modeMap[el] > maxCount) {
          maxEl = el;
          maxCount = modeMap[el];
        }
      }
      return maxEl;
    }
    const prediction = selectLargestQuantity(convertOrders);
    network.train(trainingData, {
      iterations: 1000
    });
    const output = network.run(prediction);
    console.log(`Category: ${output}`);
    const predictedCategory = String(output);
    const predictedRestaurants = restaurants.filter(restaurant => restaurant.type === predictedCategory);
    // console.log(predictedRestaurants);

    const getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
    if (predictedRestaurants.length === 1) predictedRestaurantIndex = 0;
    else predictedRestaurantIndex = getRandomInt(0, predictedRestaurants.length);
    // const smartAssistantPrediction = new smartAssistantModel({
    //   customerID: customerID,
    //   restaurantID: predictedRestaurants[predictedRestaurantIndex]._id,
    //   restaurantName: predictedRestaurants[predictedRestaurantIndex].name,
    //   restaurantType: predictedRestaurants[predictedRestaurantIndex].type,
    //   restaurantAvatar: predictedRestaurants[predictedRestaurantIndex].avatar
    // });
    // console.log(smartAssistantPrediction);
    try {
      // await smartAssistantPrediction.save();
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


// exports.trainNetwork = async (req, res) => {
//   const body = req.body;
//   const customerID = req.body;
//   const customerOrders = JSON.parse(body.customerOrders);
//   const restaurants = JSON.parse(body.restaurants);
//   const restaurantsTypes = [
//     { id: 0, type: 'Kebab' },
//     { id: 1, type: 'Burgers' },
//     { id: 2, type: 'Chinease' },
//     { id: 3, type: 'Italian' },
//     { id: 4, type: 'Polish' },
//     { id: 5, type: 'Pizza' },
//     { id: 6, type: 'Thai' },
//     { id: 7, type: 'Vege' },
//     { id: 8, type: 'Sushi' },
//     { id: 9, type: 'Other' },
//   ];

//   const convertOrders = customerOrders.map(order => {
//     if (order.restaurantType === 'Kebab') return 0;
//     else if (order.restaurantType === 'Burgers') return 1;
//     else if (order.restaurantType === 'Chinease') return 2;
//     else if (order.restaurantType === 'Italian') return 3;
//     else if (order.restaurantType === 'Polish') return 4;
//     else if (order.restaurantType === 'Pizza') return 5;
//     else if (order.restaurantType === 'Thai') return 6;
//     else if (order.restaurantType === 'Vege') return 7;
//     else if (order.restaurantType === 'Sushi') return 8;
//     else if (order.restaurantType === 'Other') return 9;
//   });

//   const selectLargestQuantity = array => {
//     if (array.length == 0)
//       return null;
//     let modeMap = {};
//     let maxEl = array[0], maxCount = 1;
//     for (let i = 0; i < array.length; i++) {
//       let el = array[i];
//       if (modeMap[el] == null)
//         modeMap[el] = 1;
//       else
//         modeMap[el]++;
//       if (modeMap[el] > maxCount) {
//         maxEl = el;
//         maxCount = modeMap[el];
//       }
//     }
//     return maxEl;
//   }

//   // const getRandomInt = (min, max) => {
//   //   min = Math.ceil(min);
//   //   max = Math.floor(max);
//   //   return Math.floor(Math.random() * (max - min)) + min;
//   // }
//   // const generateTrainingData =

//   // const trainingData = {
//   // input: convertOrders,
//   // output: [largestQuantity]
//   // };
//   // console.log(trainingData);
//   const largestQuantity = selectLargestQuantity([0, 0, 1, 1, 3, 3]);
//   console.log(largestQuantity);
//   const network = new brain.NeuralNetwork();
//   // network.train([
//   //   { input: convertOrders, output: [largestQuantity] },

//   // ]);
//   network.train([
//     { input: [0, 0, 5, 0], output: [0] },
//     { input: [0, 5, 5, 5], output: [5] },
//     { input: [0, 1, 1, 5], output: [1] },

//   ]);
//   const result = network.run([1, 0, 0, 1]);
//   console.log(`probability: ${(result * 100).toFixed(2)}%`);

//   try {
//     res.send('Brain!');
//   } catch (error) {
//     res.status(500).send(error);
//   }
// }