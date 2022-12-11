const brain = require('brain.js');
const lazyAssistantModel = require("../models/lazyAssistantModel");

exports.predictRestaurant = async (req, res) => {
  const body = req.body;
  const customerID = body.id;
  const types = JSON.parse(body.customerOrders);
  const customerOrders = await lazyAssistantModel.findOne({ customerID: customerID });
  const restaurants = JSON.parse(body.restaurants);
  let lastError = 0;
  let predict = [];
  let accuracy = -1;
  let svg = null;
  const svgoptions = {
    fontSize: "12px",
    width: 600,
    height: 400,
    radius: 6,
    line: { width: 0.5, color: "rgba(0,0,0,1)" },
    inputs: { color: "rgba(0,127,0,0.6)", label: [] },
    hidden: { color: "rgba(255,127,80,0.6)" },
    outputs: { color: "rgba(100,149,237,0.6)" }
  }
  const parseRestaurantData = restaurants.map(restaurant => (
    {
      id: restaurant._id,
      name: restaurant.name,
      menu: restaurant.menu,
      type: restaurant.type,
    }
  ));
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  let parseCustomerOrders = [];

  if (customerOrders === null) {
    parseCustomerOrders.push('');
  } else {
    for (let i = 0; i < customerOrders.orderedProducts.length; i++) {
      parseCustomerOrders.push(customerOrders.orderedProducts[i].productName);
    }
  }
  const customerOrdersTypes = types.map(order => order.restaurantType);
  let uniqueTypes = [];
  if (parseCustomerOrders[0] === '') {
    const types = ['Burgers', 'Kebab', 'Chinease', 'Italian', 'Polish', 'Pizza', 'Thai', 'Vege', 'Sushi', 'Other'];
    uniqueTypes.push(types[getRandomInt(0, types.length)]);
    accuracy = -30;
  } else uniqueTypes = customerOrdersTypes.filter((v, i, a) => a.indexOf(v) === i);

  let trainingData = [];
  for (let i = 0; i < parseRestaurantData.length; i++) {
    for (let j = 0; j < uniqueTypes.length; j++) {
      if (parseRestaurantData[i].type === uniqueTypes[j]) {
        let inputs = [];
        for (let k = 0; k < parseRestaurantData[i].menu.length; k++) {
          inputs.push(parseRestaurantData[i].menu[k].productName);
        }
        if (inputs.length !== 0) trainingData.push({ input: inputs, output: parseRestaurantData[i].id });
      }
    }
  }
  const getError = (err) => {
    console.log(err);
    lastError = 100 - (Number(err.slice(32, err.length)) * 1000);
  }
  const trainNeuralNetwork = () => {
    const network = new brain.recurrent.LSTM();
    network.train(trainingData,
      {
        iterations: 90,
        log: err => getError(err),
        logPeriod: 10,
      });
    const output = network.run(parseCustomerOrders);
    console.log(`Output: ${output}`);
    svg = brain.utilities.toSVG(network, svgoptions);
    const predictedRestaurant = restaurants.filter(restaurant => restaurant._id === output);
    if (predictedRestaurant.length > 0) predict = predictedRestaurant;
    else {
      accuracy--;
      trainNeuralNetwork();
    }
  }
  trainNeuralNetwork();
  const returnObject = {
    id: predict[0]._id,
    avatar: predict[0].avatar,
    name: predict[0].name,
    accuracy: `${(lastError + accuracy).toFixed()}%`,
    svg: svg,
  }

  try {
    res.send(returnObject);
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.updateTrainingData = async (req, res) => {
  const { id, name, lastname, mail } = req.body;
  const products = JSON.parse(req.body.products);
  const restaurant = req.body.restaurant;
  const trainingData = products.map(train => (
    {
      productName: train.productName,
      productPrice: train.productPrice,
      productDescription: train.productDescription,
    }
  ));
  const lazyAssistantData = await lazyAssistantModel.findOne({ customerID: id });
  if (lazyAssistantData === null) {
    const newTrainingData = new lazyAssistantModel({
      customerID: id,
      name: name,
      lastname: lastname,
      mail: mail,
      orderedProducts: trainingData
    });
    try {
      await newTrainingData.save();
      res.send('');
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    const updateTrainingData = await lazyAssistantModel.updateOne(
      { customerID: id },
      {
        $push: {
          orderedProducts: trainingData,
        }
      }
    );

    try {
      res.send('');
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // clear client from lazy assistant data
  // const id = '62e2fcde2bad67fcf32fefbe';
  // await lazyAssistantModel.deleteOne({ _id: id });
  // try {
  //   res.send('');
  // } catch (error) {
  //   res.status(500).send(error);
  // }
}


exports.getTrainingData = async (req, res) => {
  const trainingData = await lazyAssistantModel.find({});
  try {
    res.send(trainingData);
  } catch (error) {
    res.status(500).send(error);
  }
}

// exports.predictRestaurant = async (req, res) => {
//   const body = req.body;
//   const customerID = req.body;
//   const customerOrders = JSON.parse(body.customerOrders);
//   const restaurants = JSON.parse(body.restaurants);
//   let lastError = 0;
//   let predict = [];
//   let accuracy = -1;

//   const parseRestaurantData = restaurants.map(restaurant => (
//     {
//       id: restaurant._id,
//       name: restaurant.name,
//       menu: restaurant.menu,
//       type: restaurant.type,
//     }
//   ));

//   let parseCustomerOrders = [];
//   if (customerOrders.length === 0) {
//     parseCustomerOrders.push('');
//   } else {
//     for (let i = 0; i < customerOrders.length; i++) {
//       for (let j = 0; j < customerOrders[i].products.length; j++) {
//         parseCustomerOrders.push(customerOrders[i].products[j].productName);
//       }
//     }
//   }
//   const customerOrdersTypes = customerOrders.map(order => order.restaurantType);
//   let uniqueTypes = [];

//   if (parseCustomerOrders[0] === '') {
//     uniqueTypes.push('Burgers');
//     uniqueTypes.push('Kebab');
//     // uniqueTypes.push('Chinease');
//     // uniqueTypes.push('Italian');
//     // uniqueTypes.push('Polish');
//     uniqueTypes.push('Pizza');
//     // uniqueTypes.push('Thai');
//     // uniqueTypes.push('Vege');
//     uniqueTypes.push('Sushi');
//     uniqueTypes.push('Other');
//   } else {
//     uniqueTypes = customerOrdersTypes.filter((v, i, a) => a.indexOf(v) === i);
//   }
//   console.log(uniqueTypes);
//   let trainingData = [];
//   for (let i = 0; i < parseRestaurantData.length; i++) {
//     for (let j = 0; j < uniqueTypes.length; j++) {
//       if (parseRestaurantData[i].type === uniqueTypes[j]) {
//         for (let k = 0; k < parseRestaurantData[i].menu.length; k++) {
//           trainingData.push({ input: parseRestaurantData[i].menu[k].productName, output: parseRestaurantData[i].id });
//         }
//       }
//     }
//   }

//   const getError = (err) => {
//     console.log(err);
//     lastError = 100 - (Number(err.slice(32, err.length)) * 1000);
//   }

//   const trainNeuralNetwork = () => {
//     const network = new brain.recurrent.LSTM();
//     network.train(trainingData,
//       {
//         iterations: 90,
//         log: err => getError(err),
//         logPeriod: 10,
//       });
//     const output = network.run(parseCustomerOrders);
//     console.log(`Output: ${output}`);
//     const predictedRestaurant = restaurants.filter(restaurant => restaurant._id === output);
//     if (predictedRestaurant.length > 0) predict = predictedRestaurant;
//     else {
//       accuracy--;
//       trainNeuralNetwork();
//     }
//   }
//   trainNeuralNetwork();
//   const returnObject = {
//     id: predict[0]._id,
//     avatar: predict[0].avatar,
//     name: predict[0].name,
//     accuracy: `${(lastError + accuracy).toFixed()}%`,
//   }
//   console.log(returnObject);
//   try {
//     res.send(returnObject);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// }

// exports.predictRestaurant = async (req, res) => {
//   const body = req.body;
//   const customerID = req.body;
//   const customerOrders = JSON.parse(body.customerOrders);
//   const restaurants = JSON.parse(body.restaurants);
//   let orderedProducts = '';
//   let predictedRestaurantIndex = 0;
//   customerOrders.forEach(order => order.products.forEach(product => orderedProducts += `${ product.productName }, `));

//   const randomRestaurant = (min, max) => {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min)) + min;
//   }
//   const lazyAssistantData = await lazyAssistantModel.find({});
//   const trainNeuralNetwork = () => {
//     const network = new brain.recurrent.LSTM();
//     const trainingData = lazyAssistantData.map(item => ({
//       input: item.input,
//       output: String(item.output),
//     }));

//     network.train(trainingData, {
//       iterations: 100,
//       log: true,
//       logPeriod: 10,
//     });
//     const output = network.run(orderedProducts);
//     console.log(`Restaurant Type: ${ output }`);
//     return Number(output);
//   }

//   if (customerOrders.length !== 0 && restaurants.length !== 0) {
//     const predictRestaurantType = () => {
//       const predictedType = trainNeuralNetwork();
//       const convertedTypeFromNumber = () => {
//         if (predictedType === 0) return 'Kebab';
//         else if (predictedType === 1) return 'Burgers';
//         else if (predictedType === 2) return 'Chinease';
//         else if (predictedType === 3) return 'Italian';
//         else if (predictedType === 4) return 'Polish';
//         else if (predictedType === 5) return 'Pizza';
//         else if (predictedType === 6) return 'Thai';
//         else if (predictedType === 7) return 'Vege';
//         else if (predictedType === 8) return 'Sushi';
//         else if (predictedType === 9) return 'Other';
//         else return 'Error';
//       }
//       const convertedType = convertedTypeFromNumber();
//       if (convertedType === 'Error') predictRestaurantType();
//       else {
//         const predictedRestaurants = restaurants.filter(restaurant => restaurant.type === convertedType);
//         if (predictedRestaurants.length === 1) predictedRestaurantIndex = 0;
//         else predictedRestaurantIndex = randomRestaurant(0, predictedRestaurants.length);
//         return predictedRestaurants;
//       }
//     }
//     let predictedRestaurants;
//     if (lazyAssistantData) predictedRestaurants = predictRestaurantType();
//     try {
//       res.send(predictedRestaurants[predictedRestaurantIndex]);
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   } else {
//     try {
//       res.send({ error: 'Array is empty!' });
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   }
//   // try {
//   //   res.send('null');
//   // } catch (error) {
//   //   res.status(500).send(error);
//   // }
// }

// exports.updateTrainingData = async (req, res) => {
//   const { restaurantType, products } = req.body;
//   const convertedTypeFromString = () => {
//     if (restaurantType === 'Kebab') return 0;
//     else if (restaurantType === 'Burgers') return 1;
//     else if (restaurantType === 'Chinease') return 2;
//     else if (restaurantType === 'Italian') return 3;
//     else if (restaurantType === 'Polish') return 4;
//     else if (restaurantType === 'Pizza') return 5;
//     else if (restaurantType === 'Thai') return 6;
//     else if (restaurantType === 'Vege') return 7;
//     else if (restaurantType === 'Sushi') return 8;
//     else if (restaurantType === 'Other') return 9;
//   }
//   const output = convertedTypeFromString();
//   const lazyAssistantData = await lazyAssistantModel.findOne({ output: output });
//   const currentData = lazyAssistantData.input;

//   const filterNewData = currentData.search(products);
//   console.log(filterNewData);
//   if (filterNewData === -1) {
//     const newData = currentData + products;
//     await lazyAssistantModel.updateOne(
//       { output: output },
//       { input: newData }
//     );
//   }

//   try {
//     res.send('');
//   } catch (error) {
//     res.status(500).send(error);
//   }
// }