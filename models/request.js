const mongoose = require("mongoose");

const { businessDays, emailDates } = require("../lib/utils/dates");
const email = require("../lib/utils/email");
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
    next(new BadRequestError());
  }
});

requestSchema.post("save", async function(next) {
  try {
    if (this.status === "accepted") {
      const employee = await mongoose.model("Employee").findById(this.employee);
      const avDays = employee.availableDays - businessDays(this.startDate, this.endDate);
      await mongoose
        .model("Employee")
        .findByIdAndUpdate(this.employee, { availableDays: avDays }, { omitUndefined: true });
    }

    if (this.status !== "requested") {
      const employee = await mongoose.model("Employee").findById(this.employee);
      const start = emailDates(this.startDate);
      const end = emailDates(this.endDate);
      const to = employee.email;
      const text = `Your vacation request from ${start} to ${end} has been ${this.status}. You have left ${employee.availableDays} available vacation days.`;
      email.send({
        from: "info@vacations.lgo",
        to,
        text,
      });
    }
  } catch (error) {
    next(new BadRequestError());
  }
});

requestSchema.pre("findOneAndUpdate", async function(next) {
  try {
    const id = this.getQuery()["_id"];
    const requestToUpdate = await mongoose.model("Request").findById(id);
    const employee = await mongoose.model("Employee").findById(requestToUpdate.employee);
    const avDays =
      employee.availableDays + businessDays(requestToUpdate.startDate, requestToUpdate.endDate);
    await mongoose
      .model("Employee")
      .findByIdAndUpdate(
        requestToUpdate.employee,
        { availableDays: avDays },
        { omitUndefined: true }
      );
  } catch (error) {
    next(new BadRequestError());
  }
});

requestSchema.pre("findOneAndDelete", async function(next) {
  try {
    const id = this.getQuery()["_id"];
    const requestToDelete = await mongoose.model("Request").findById(id);
    let avDays;
    if (requestToDelete.status === "accepted") {
      const employee = await mongoose.model("Employee").findById(requestToDelete.employee);
      avDays =
        employee.availableDays + businessDays(requestToDelete.startDate, requestToDelete.endDate);
      await mongoose
        .model("Employee")
        .findByIdAndUpdate(
          requestToDelete.employee,
          { availableDays: avDays },
          { omitUndefined: true }
        );
    }
  } catch (error) {
    next(new BadRequestError());
  }
});

module.exports = mongoose.model("Request", requestSchema);
