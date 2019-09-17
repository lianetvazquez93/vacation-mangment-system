const mongoose = require("mongoose");

const requestSchema = mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["requested", "accepted", "denied"],
  },
  employee: {
    type: mongoose.Types.ObjectId,
    ref: "Employee",
  },
});

module.exports = mongoose.model("Request", requestSchema);
