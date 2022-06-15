const express = require("express");
const mongoose = require("mongoose");
const OpinionRouter = require("./routes/opinionsRoute");
const CustomerRouter = require("./routes/customersRoute");
const RestaurantRouter = require("./routes/restaurantsRoute");
const LazyAssistantRouter = require("./routes/lazyAssistantRoute");
const cors = require('cors');
const app = express();
const PORT = 4000;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
  extended: true,
}));
const username = "Webking";
const password = "QnYdG0yiMlzJ5rua";
const cluster = "cluster0.lcsps";
const dbname = "LazyTaste";
mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.use(CustomerRouter);
app.use(RestaurantRouter);
app.use(OpinionRouter);
app.use(LazyAssistantRouter);
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});