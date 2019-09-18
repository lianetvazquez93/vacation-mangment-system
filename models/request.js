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
    default: "requested",
  },
  employee: {
    type: mongoose.Types.ObjectId,
    ref: "Employee",
    default: "5d80e64d15e0dc528ecca257",
  },
});

module.exports = mongoose.model("Request", requestSchema);
