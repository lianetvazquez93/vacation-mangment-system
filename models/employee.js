const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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
    select: false,
  },
});

employeeSchema.pre("save", function(next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

employeeSchema.post("findOneAndDelete", { document: true }, function() {
  const id = this.getQuery()["_id"];
  mongoose.model("Request").deleteMany({ employee: id }, function(err) {
    if (err) {
      throw err;
    }
  });
});

module.exports = mongoose.model("Employee", employeeSchema);
