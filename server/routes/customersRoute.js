const express = require("express");
const app = express();
const customerController = require('../controllers/customer');

// Register
app.put("/API/customers", customerController.registerCustomer);

// Get Users
app.get("/API/customers", customerController.getAllCustomers);
app.get("/API/customers/:id", customerController.getOneCustomer)

// Login
app.post("/API/customers", customerController.loginCustomer);

// Update 
app.patch("/API/customers", customerController.updateCustomer);

// AddOrder
app.put("/API/customer/add-order", customerController.addOrder);
app.delete('/API/customer/clear-orders', customerController.clearOrders);

// Manage favourites
app.put("/API/customers/:id", customerController.addFavourite);
app.delete("/API/customers/:customerID/:restaurantID", customerController.deleteFavourite);

module.exports = app;