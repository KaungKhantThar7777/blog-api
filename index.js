require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");

const path = require("path");

const router = require("./routes");

const mongoString = process.env.DB_URL;

mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", () => {
  if (process.env.NODE_ENV === "development") {
    console.log(error);
  }
});

mongoose.connection.on("open", () => {
  console.log("Connected to MongoDB database");
});

const PORT = process.env.PORT || 5000;

const app = express();
app.use(helmet());
app.use(router);

app.use("/assets", express.static(path.join(__dirname, "..", "..", "assets")));

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
