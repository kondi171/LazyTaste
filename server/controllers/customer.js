const customerModel = require("../models/customerModel");
const errors = [
  {
    status: 404,
    message: 'Invalid credentials!',
  },
]

exports.getAllCustomers = async (req, res) => {
  const customer = await customerModel.find({});
  try {
    res.send(customer);
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.getOneCustomer = async (req, res) => {
  const customer = await customerModel.findOne({ _id: req.params.id });
  try {
    res.send(customer);
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.loginCustomer = async (req, res) => {
  const mail = req.body.mail;
  const password = req.body.password;
  const customer = await customerModel.find({ mail: mail, password: password });
  if (customer.length > 0) res.send(customer[0]);
  else res.send(errors[0]);
}

exports.registerCustomer = async (req, res) => {
  const isIn = await customerModel.find({ mail: req.body.mail })
  if (isIn.length > 0) res.send('The specified user already exists!');
  else {
    const customer = new customerModel(req.body);
    try {
      await customer.save();
      res.send(customer);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

exports.updateCustomer = async (req, res) => {
  const { id, field, value } = req.body;
  let updatedField = null;
  if (field === 'name') updatedField = await customerModel.updateOne({ _id: id }, { name: value });
  else if (field === 'lastname') updatedField = await customerModel.updateOne({ _id: id }, { lastname: value });
  else if (field === 'password') updatedField = await customerModel.updateOne({ _id: id }, { password: value });
  else if (field === 'phone') updatedField = await customerModel.updateOne({ _id: id }, { phone: value });
  else if (field === 'adress') updatedField = await customerModel.updateOne({ _id: id }, { adress: value });
  else if (field === 'avatar') updatedField = await customerModel.updateOne({ _id: id }, { avatar: value });
  try {
    res.send(updatedField);
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.addFavourite = async (req, res) => {

  const { restaurantID, restaurantName, restaurantAvatar } = req.body;
  const customerFavourite = await customerModel.updateOne(
    { _id: req.params.id },
    {
      $push: {
        favourites: {
          restaurantID: restaurantID,
          restaurantName: restaurantName,
          restaurantAvatar: restaurantAvatar,
        }
      }
    }
  );
  try {
    res.send(customerFavourite);
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.deleteFavourite = async (req, res) => {
  const { customerID, restaurantID } = req.params;
  const customerFavourite = await customerModel.updateOne(
    { _id: customerID },
    { $pull: { favourites: { restaurantID: restaurantID } } }
  );
  try {
    res.send(customerFavourite);
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.addOrder = async (req, res) => {
  const body = req.body;
  const customerID = body.id;
  const deliveryCost = body.deliveryCost;
  const restaurantName = JSON.parse(body.order).restaurantName;
  const restaurantAvatar = JSON.parse(body.order).restaurantAvatar;
  const restaurantType = JSON.parse(body.order).restaurantType;
  const message = JSON.parse(body.order).message;
  const paymentMethod = JSON.parse(body.order).paymentMethod;
  const parsedMessage = message === '' ? 'none' : message;
  const today = new Date();
  const date = `${today.getDate() > 10 ? today.getDate() : '0' + today.getDate()}.${today.getMonth() + 1 > 10 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1)}.${today.getFullYear()} ${today.getHours() > 10 ? today.getHours() : '0' + today.getHours()}:${today.getMinutes() > 10 ? today.getMinutes() : '0' + today.getMinutes()}`;
  const products = JSON.parse(body.order).products;
  let overallPaid = Number(deliveryCost);
  products.forEach(product => overallPaid += product.productPrice);
  const productsArray = products.map(product => JSON.parse(
    `{
      "productName": "${product.productName}",
      "productPrice": "${product.productPrice}"
    }`
  ));
  const customerOrder = await customerModel.updateOne(
    { _id: customerID },
    {
      $push: {
        orders: {
          restaurantName: restaurantName,
          restaurantAvatar: restaurantAvatar,
          restaurantType: restaurantType,
          message: parsedMessage,
          paid: overallPaid.toFixed(2),
          paymentMethod: paymentMethod,
          date: date,
          deliveryCost: Number(deliveryCost),
          products: productsArray,
        }
      }
    }
  );
  try {
    res.send(customerOrder);
  } catch (error) {
    res.status(500).send('error');
  }
}

exports.clearOrders = async (req, res) => {
  const id = '62a89165c52922b12a46e565';
  await customerModel.updateOne({ _id: id }, { orders: [] })
  try {
    res.send('orders cleared');
  } catch (error) {
    res.status(500).send('error');
  }
}