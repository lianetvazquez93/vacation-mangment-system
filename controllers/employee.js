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

module.exports = {
  add,
};
