require("./models/User");
require("./models/track");
const express = require("express");
const mongoose = require("mongoose");
const authRouters = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const bodyParser = require("body-parser");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRouters);
app.use(trackRoutes);

const mongoUri =
  "mongodb+srv://hieuldph14948:no6fKyTX3So3paQZ@cluster0.v7roei9.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoUri);
mongoose.connection.on("connection", () => {
  console.log("connect to mongo ");
});
mongoose.connection.on("error", (err) => {
  log.error("error connecting to mongo", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`your email:${req.user.email}`);
});
app.listen(3000, () => {
  console.log("Listen on port 3000");
});
