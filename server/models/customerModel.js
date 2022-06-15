const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  mail: {
    type: String,
    required: true,
    default: 'none',
  },
  password: {
    type: String,
    required: true,
    default: 0,
  },
  name: {
    type: String,
    required: true,
    default: 'none',
  },
  lastname: {
    type: String,
    required: true,
    default: 'none',
  },
  phone: {
    type: String,
    required: true,
    default: 'none',
  },
  adress: {
    type: String,
    required: true,
    default: 'none',
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