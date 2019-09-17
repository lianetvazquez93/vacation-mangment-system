const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"],
  },
  totalDays: {
    type: Number,
    default: 20,
  },
  usedDays: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
