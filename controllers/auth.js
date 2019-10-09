const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const Employee = require("../models/employee");
const { ResourceNotFoundError, MissingCredentialsError } = require("../lib/errors");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new MissingCredentialsError();
    }

    const employee = await Employee.findOne({ email });

    if (!employee) {
      throw new ResourceNotFoundError();
    }

    const match = await bcrypt.compare(password, employee.password);

    if (!match) {
      throw new MissingCredentialsError("Password does not match");
    }

    const token = jwt.sign({ id: employee._id, role: employee.role }, process.env.JWT_SECRET);

    res.send({ token });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

const profile = async (req, res) => {
  try {
    const employee = await Employee.findById(req.employee.id).select("-password");

    if (!employee) {
      throw new ResourceNotFoundError();
    }

    res.json(employee);
  } catch (error) {
    res.status(error.statusCode).send(error.message);
  }
};

module.exports = {
  login,
  profile,
};
