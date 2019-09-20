const Employee = require("../models/employee");

const add = async (req, res) => {
  try {
    let newEmployee = new Employee({
      fullName: req.body.fullName,
      email: req.body.email,
      department: req.body.department,
      role: req.body.role,
    });
    await newEmployee.save();
    res.status(201).send("Employee created...");
  } catch (error) {
    req.status(400).send(error.message);
    console.log(error.message);
  }
};

const get = async (req, res) => {
  try {
    let employees = await Employee.find();
    res.send(employees);
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error.message);
  }
};

const update = async (req, res) => {
  try {
    await Employee.findByIdAndUpdate(
      req.body.id,
      {
        fullName: req.body.fullName,
        email: req.body.email,
        department: req.body.department,
        role: req.body.role,
        totalDays: req.body.totalDays,
        usedDays: req.body.usedDays,
      },
      { omitUndefined: true }
    );
    res.send("Employee updated...");
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error.message);
  }
};

const remove = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.send("Employee deleted...");
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error.message);
  }
};

module.exports = {
  add,
  get,
  update,
  remove,
};
