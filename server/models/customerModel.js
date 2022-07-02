const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  mail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
    default: 'blank',
  },
  orders: [
    {
      restaurantName: String,
      restaurantAvatar: String,
      restaurantType: String,
      paid: Number,
      message: String,
      date: String,
      deliveryCost: Number,
      paymentMethod: {
        type: String,
        default: 'Cash',
      },
      products: [
        {
          productName: String,
          productPrice: Number,
        }
      ],
    }
  ],
  favourites: [
    {
      restaurantID: String,
      restaurantName: String,
      restaurantAvatar: String,
    }
  ]
});

const Customer = mongoose.model('customers', CustomerSchema, 'customers');

module.exports = Customer;