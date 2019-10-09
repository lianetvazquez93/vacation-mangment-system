const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const { BadRequestError } = require("../lib/errors");

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
  availableDays: {
    type: Number,
    default: 20,
  },
  password: {
    type: String,
    required: true,
  },
});

employeeSchema.pre("save", function(next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

employeeSchema.post("findOneAndDelete", async function(next) {
  try {
    const id = this.getQuery()["_id"];
    await mongoose.model("Request").deleteMany({ employee: id });
  } catch (error) {
    next(new BadRequestError());
  }
});

module.exports = mongoose.model("Employee", employeeSchema);
