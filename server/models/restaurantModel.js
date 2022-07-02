const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
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
  },
  NIP: {
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
  promotion: {
    type: String,
    required: false,
    default: 'None',
  },
  delivery: {
    deliveryCost: {
      type: Number,
      default: 10,
      required: false
    },
    deliveryActive: {
      type: Boolean,
      default: false,
      required: false,
    },
    orderMinValue: {
      type: Number,
      default: 50,
      required: false,
    },
    orderValueToFreeDelivery: {
      type: Number,
      default: 100,
      required: false,
    },
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