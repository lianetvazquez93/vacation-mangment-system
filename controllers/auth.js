const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const Employee = require("../models/employee");
const { ResourceNotFoundError, MissingCredentialsError } = require("../lib/errors");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });

    if (!employee) {
      throw new ResourceNotFoundError();
    }

    if (!password) {
      throw new MissingCredentialsError();
    }

    const match = await bcrypt.compare(password, employee.password);

    if (!match) {
      throw new MissingCredentialsError("Password does not match");
    }

    const token = jwt.sign({ id: employee._id, role: employee.role }, process.env.JWT_SECRET);

    res.send({ token });
  } catch (error) {
    res.status(error.statusCode).send(error.message);
  }
};

const profile = async (req, res) => {
  try {
    const { fullName, email, department, totalDays } = await Employee.findById(req.employee.id);

    if (!email) {
      throw new ResourceNotFoundError();
    }

    res.json({
      Name: fullName,
      Email: email,
      Department: department,
      Total: totalDays,
    });
  } catch (error) {
    res.status(error.statusCode).send(error.message);
  }
};

module.exports = {
  login,
  profile,
};
