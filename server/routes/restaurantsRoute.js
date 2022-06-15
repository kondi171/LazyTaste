const express = require("express");
const app = express();
const restaurantController = require('../controllers/restaurant');

// Register
app.put("/API/restaurants", restaurantController.registerRestaurant);

// Get Restaurants
app.get("/API/restaurants", restaurantController.getAllRestaurants);
app.get("/API/restaurants/:id", restaurantController.getOneRestaurant);

// Login
app.post("/API/restaurants", restaurantController.loginRestaurant);

// Update 
app.patch("/API/restaurants", restaurantController.updateRestaurant);

// Add Promotion
app.put("/API/restaurant/add-promotion", restaurantController.addPromotion);

// Add Order
app.put("/API/restaurant/add-order", restaurantController.addOrder);

// Add Section
// app.put("/API/restaurant/menu/add-section", restaurantController.addSection);

// Modify Product
app.put("/API/restaurant/menu/add-product", restaurantController.addProduct);
app.patch("/API/restaurant/:restaurantID/:productID", restaurantController.updateProduct);
app.delete("/API/restaurant/:restaurantID/:productID", restaurantController.deleteProduct);

app.patch("/API/restaurants/:id", restaurantController.completeOrder);
module.exports = app;