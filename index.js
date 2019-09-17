require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const routes = require("./routes");
const PORT = process.env.APP_PORT || 8000;

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
