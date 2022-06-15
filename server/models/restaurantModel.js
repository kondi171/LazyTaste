const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
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
  NIP: {
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
  promotion: {
    type: String,
    required: false,
    default: 'None',
  },
  deliveryCost: {
    type: Number,
    required: false,
    default: 10,
  },
  menu: [
    {
      productName: String,
      productPrice: Number,
    },
  ],
  orders: [
    {
      customerName: String,
      customerLastname: String,
      customerAvatar: String,
      customerAdress: String,
      paid: Number,
      message: String,
      date: String,
      paymentMethod: String,
      deliveryCost: Number,
      products: [
        {
          productName: String,
          productPrice: Number,
        }
      ],
      active: Boolean,
    }
  ],
  type: {
    type: String,
    required: false,
    default: 'Other',
  }
});

const Restaurant = mongoose.model('restaurants', RestaurantSchema, 'restaurants');

module.exports = Restaurant;