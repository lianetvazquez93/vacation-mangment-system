const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const Employee = require("../models/employee");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });

    if (!employee) {
      res.status(404);
      throw new Error("Employee not found");
    }

    if (!password) {
      res.status(401);
      throw new Error("A password is required");
    }

    const match = await bcrypt.compare(password, employee.password);

    if (!match) {
      res.status(401);
      throw new Error("Password does not match");
    }

    const token = jwt.sign({ id: employee._id, role: employee.role }, process.env.JWT_SECRET);

    res.send({ token });
  } catch (error) {
    res.send(error.message);
  }
};

const profile = async (req, res) => {
  try {
    const { fullName, email, department, totalDays } = await Employee.findById(req.employee.id);

    if (!email) {
      res.status(404);
      throw new Error("Employee does mot exist");
    }

    res.send(
      ` Name: ${fullName},\n Email: ${email},\n Department: ${department},\n Vacation Days: ${totalDays}`
    );
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  login,
  profile,
};
