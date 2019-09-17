require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.APP_PORT || 5000;

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }).catch(error => {
  console.log(error.message);
  process.exit(1);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
