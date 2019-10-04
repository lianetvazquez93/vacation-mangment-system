const mongoose = require("mongoose");

const { businessDays } = require("../lib/utils/dates");
const { BadRequestError } = require("../lib/errors");

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
  },
});

requestSchema.pre("save", async function(next) {
  try {
    const employee = await mongoose.model("Employee").findById(this.employee);
    if (employee.availableDays < businessDays(this.startDate, this.endDate)) {
      throw new BadRequestError("Not enough available days");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Request", requestSchema);
