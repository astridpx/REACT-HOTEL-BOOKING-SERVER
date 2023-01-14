const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const moment = require("moment");

// ROUTES
const PersonRoutes = require("./routes/person.routes");
const AdminRoutes = require("./routes/admin.routes");

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(port, () => {
  console.log("SERVER IS RUNNING AT PORT " + port);
});

// MONGODB CONNECTION
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MONGODB CONNECTION ESTABLISHED.");
});

const logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get("host")}${
      req.originalUrl
    } : ${moment().format()}`
  );
  next();
};

app.use(logger);
app.use("/room", PersonRoutes);
app.use("/admin", AdminRoutes);
