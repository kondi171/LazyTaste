const restaurantModel = require("../models/restaurantModel");
const errors = [
  {
    status: 404,
    message: 'Invalid credentials!',
  },
]
exports.loginRestaurant = async (req, res) => {
  const NIP = req.body.NIP;
  const password = req.body.password;
  const restaurant = await restaurantModel.find({ NIP: NIP, password: password });
  if (restaurant.length > 0) res.send(restaurant[0]);
  else res.send(errors[0]);
}

exports.registerRestaurant = async (req, res) => {
  const isIn = await restaurantModel.find({ NIP: req.body.NIP })
  if (isIn.length > 0) res.send('The specified user already exists!');
  else {
    const restaurant = new restaurantModel(req.body);
    try {
      await restaurant.save();
      res.send(restaurant);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

exports.getAllRestaurants = async (req, res) => {
  const restaurant = await restaurantModel.find({});
  try {
    res.send(restaurant);
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.getOneRestaurant = async (req, res) => {
  const restaurant = await restaurantModel.findOne({ _id: req.params.id });
  try {
    res.send(restaurant);
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.updateRestaurant = async (req, res) => {
  const { id, field, value } = req.body;
  let updatedField = null;
  const restaurant = await restaurantModel.findOne({ _id: id });
  const { deliveryCost, deliveryActive, orderMinValue, orderValueToFreeDelivery } = restaurant.delivery;
  if (field === 'name') updatedField = await restaurantModel.updateOne({ _id: id }, { name: value });
  else if (field === 'mail') updatedField = await restaurantModel.updateOne({ _id: id }, { mail: value });
  else if (field === 'password') updatedField = await restaurantModel.updateOne({ _id: id }, { password: value });
  else if (field === 'phone') updatedField = await restaurantModel.updateOne({ _id: id }, { phone: value });
  else if (field === 'adress') updatedField = await restaurantModel.updateOne({ _id: id }, { adress: value });
  else if (field === 'avatar') updatedField = await restaurantModel.updateOne({ _id: id }, { avatar: value });
  else if (field === 'deliveryCost') updatedField = await restaurantModel.updateOne(
    { _id: id },
    {
      delivery: {
        deliveryCost: value,
        deliveryActive: deliveryActive,
        orderMinValue: orderMinValue,
        orderValueToFreeDelivery: orderValueToFreeDelivery
      }
    });
  else if (field === 'orderMinValue') updatedField = await restaurantModel.updateOne(
    { _id: id },
    {
      delivery: {
        deliveryCost: deliveryCost,
        deliveryActive: deliveryActive,
        orderMinValue: value,
        orderValueToFreeDelivery: orderValueToFreeDelivery
      }
    });
  else if (field === 'orderValueToFreeDelivery') updatedField = await restaurantModel.updateOne(
    { _id: id },
    {
      delivery: {
        deliveryCost: deliveryCost,
        deliveryActive: deliveryActive,
        orderMinValue: orderMinValue,
        orderValueToFreeDelivery: value
      }
    });
  else if (field === 'deliveryActive') updatedField = await restaurantModel.updateOne(
    { _id: id },
    {
      delivery: {
        deliveryCost: deliveryCost,
        deliveryActive: value,
        orderMinValue: orderMinValue,
        orderValueToFreeDelivery: orderValueToFreeDelivery
      }
    });

  try {
    res.send(updatedField);
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.addSection = async (req, res) => {
  const { id, sectionName } = req.body;
  const newSection = await restaurantModel.updateOne(
    { _id: id },
    {
      $push: {
        productsSections: {
          sectionName: sectionName,
        }
      }
    }
  );

  try {
    res.send('newSection');
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.addProduct = async (req, res) => {
  const { id, product } = req.body;
  const JSONproduct = JSON.parse(product);

  const newProduct = await restaurantModel.updateOne(

    { _id: id },
    {
      $push: {
        menu: {
          productName: JSONproduct.productName,
          productPrice: JSONproduct.productPrice,
          productDescription: JSONproduct.productDescription,
          sectionID: JSONproduct.sectionID,
        }
      }
    });
  try {
    res.send(newProduct);
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.deleteProduct = async (req, res) => {
  const { restaurantID, productID } = req.params;
  const restaurantProduct = await restaurantModel.updateOne(
    { _id: restaurantID },
    { $pull: { menu: { _id: productID } } }
  );

  try {
    res.send(restaurantProduct);
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.updateProduct = async (req, res) => {
  const { restaurantID, productID } = req.params;
  const inputValue = req.body.value;
  const type = req.body.type;
  const restaurant = await restaurantModel.findOne({ _id: restaurantID });
  const productToChange = restaurant.menu.filter(product => String(product._id) === productID);

  if (type === 'name') productToChange[0].productName = inputValue;
  if (type === 'price') productToChange[0].productPrice = inputValue;
  if (type === 'description') productToChange[0].productDescription = inputValue;

  await restaurantModel.updateOne(
    { _id: restaurantID },
    { menu: restaurant.menu }
  );
  try {
    res.send('restaurantProduct');
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.updateSection = async (req, res) => {
  const { id, sectionID, value } = req.body;
  const restaurant = await restaurantModel.findOne({ _id: id });
  const sectionToChange = restaurant.productsSections.filter(section => String(section._id) === sectionID);
  sectionToChange[0].sectionName = value;
  await restaurantModel.updateOne(
    { _id: id },
    { productsSections: restaurant.productsSections }
  );

  try {
    res.send('restaurantSection');
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.removeSection = async (req, res) => {
  const { id, sectionID } = req.body;

  const restaurant = await restaurantModel.findOne({ _id: id });
  const productsToRemove = restaurant.menu.filter(product => product.sectionID === sectionID);
  for (let i = 0; i < productsToRemove.length; i++) {
    await restaurantModel.updateOne(
      { _id: id },
      { $pull: { menu: { _id: String(productsToRemove[i]._id) } } }
    )
  }
  const sectionToRemove = await restaurantModel.updateOne(
    { _id: id },
    { $pull: { productsSections: { _id: sectionID } } }
  );
  try {
    res.send('restaurantSection');
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.addPromotion = async (req, res) => {
  const { id, promotion } = req.body;
  const restaurantPromotion = await restaurantModel.updateOne({ _id: id }, { promotion: promotion });
  try {
    res.send(restaurantPromotion);
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.addOrder = async (req, res) => {
  const body = req.body;
  const id = body.id;
  const deliveryCost = body.deliveryCost;
  const paid = JSON.parse(body.order).paid;
  const customerName = JSON.parse(body.order).customerName;
  const customerLastname = JSON.parse(body.order).customerLastname;
  const customerAvatar = JSON.parse(body.order).customerAvatar;
  const customerAdress = JSON.parse(body.order).customerAdress;
  const message = JSON.parse(body.order).message;
  const parsedMessage = message === '' ? 'none' : message;
  const paymentMethod = JSON.parse(body.order).paymentMethod;
  const products = JSON.parse(body.order).products;
  const today = new Date();
  const date = `${today.getDate() > 10 ? today.getDate() : '0' + today.getDate()}.${today.getMonth() + 1 > 10 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1)}.${today.getFullYear()} ${today.getHours() > 10 ? today.getHours() : '0' + today.getHours()}:${today.getMinutes() > 10 ? today.getMinutes() : '0' + today.getMinutes()}`;
  const productsArray = products.map(product => JSON.parse(
    `{
      "productName": "${product.productName}",
      "productPrice": "${product.productPrice}"
    }`
  ));
  const restaurantOrder = await restaurantModel.updateOne(
    { _id: id },
    {
      $push: {
        orders: {
          customerName: customerName,
          customerLastname: customerLastname,
          customerAvatar: customerAvatar,
          customerAdress: customerAdress,
          message: parsedMessage,
          paid: paid,
          paymentMethod: paymentMethod,
          deliveryCost: Number(deliveryCost),
          date: date,
          products: productsArray,
          active: true,
        }
      }
    }
  );
  try {
    res.send('restaurantOrder');
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.completeOrder = async (req, res) => {
  const restaurantID = req.params.id;
  const orderID = req.body.orderID;
  const restaurant = await restaurantModel.findOne({ _id: restaurantID });
  const clickedOrder = restaurant.orders.filter(order => String(order._id) === orderID);
  const oldOrders = restaurant.orders;
  clickedOrder[0].active = false;
  const newOrders = await restaurantModel.updateOne(
    { _id: restaurantID },
    { orders: oldOrders }
  );

  try {
    res.send('');
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.deleteRestaurant = async (req, res) => {
  const id = req.params.id;
  await restaurantModel.deleteOne({ _id: id });
  try {
    res.send();
  } catch (error) {
    res.status(500).send('error');
  }
}