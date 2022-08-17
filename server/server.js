const express = require("express");
const mongoose = require("mongoose");
const vhost = require('vhost');
const OpinionRouter = require("./routes/opinionsRoute");
const CustomerRouter = require("./routes/customersRoute");
const RestaurantRouter = require("./routes/restaurantsRoute");
const LazyAssistantRouter = require("./routes/lazyAssistantRoute");
const cors = require('cors');

const PORT = 4000;
const main = express();

main.get('/', function (req, res) {
  res.send('Hello from main app!');
});

main.get('/:sub', function (req, res) {
  res.send('requested ' + req.params.sub);
});

const redirect = express();

redirect.use((req, res) => {
  if (!module.parent) console.log(req.vhost);
  res.redirect('http://lazytaste.com:3000' + req.vhost[0]);
});

const app = module.exports = express();

app.use(vhost('*.lazytaste.com', redirect));
app.use(vhost('lazytaste.com', app));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(express.urlencoded({
  extended: true,
  limit: '50mb',
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

app.use(CustomerRouter);
app.use(RestaurantRouter);
app.use(OpinionRouter);
app.use(LazyAssistantRouter);
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});