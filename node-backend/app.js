// imports
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const createError = require("http-errors");
const mongoose = require("mongoose");

// import routers
const informationRoutes = require("./app/routes/information");
const authRoutes = require("./app/routes/auth");

// Express settings
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// connect to mongoDB
mongoose
  .connect(
    `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DB}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// Create PORT and run the server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log("Connected to port " + PORT);
});

// setting up route endpoints
app.use("/api/", authRoutes);
app.use("/api/", informationRoutes);

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  console.log(err);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
