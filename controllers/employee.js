const Employee = require("../models/employee");

const add = async (req, res) => {
  try {
    if (req.employee.role !== "admin") {
      res.status(401);
      throw new Error("Not authorization");
    }
    let newEmployee = new Employee({
      fullName: req.body.fullName,
      email: req.body.email,
      department: req.body.department,
      role: req.body.role,
      password: req.body.password,
    });
    await newEmployee.save();
    res.status(201).send("Employee created...");
  } catch (error) {
    res.send(error.message);
  }
};

const getAll = async (req, res) => {
  try {
    if (req.employee.role !== "admin") {
      res.status(401);
      throw new Error("No authorization");
    }

    const employees = await Employee.find();
    res.send(employees);
  } catch (error) {
    res.send(error.message);
  }
};

const update = async (req, res) => {
  try {
    if (req.employee.role !== "admin") {
      res.status(401);
      throw new Error("No Authorization");
    }

    if (!req.body.id) {
      res.status(400);
      throw new Error("Missing employee's id");
    }

    const employeeToUpdate = await Employee.findById(req.body.id);

    if (!employeeToUpdate) {
      res.status(404);
      throw new Error("Employee does not exist");
    }

    if (req.body.password) {
      employeeToUpdate.password = req.body.password;
      employeeToUpdate.save();
    }

    await Employee.findByIdAndUpdate(
      req.body.id,
      {
        fullName: req.body.fullName,
        email: req.body.email,
        department: req.body.department,
        role: req.body.role,
        totalDays: req.body.totalDays,
      },
      { omitUndefined: true }
    );

    res.send("Employee updated...");
  } catch (error) {
    res.send(error.message);
  }
};

const remove = async (req, res) => {
  try {
    if (req.employee.role !== "admin") {
      res.status(401);
      throw new Error("No authorization");
    }

    const employeeToDelete = await Employee.findById(req.params.id);

    if (!employeeToDelete) {
      res.status(404);
      throw new Error("Employee does not exist");
    }

    await Employee.findByIdAndDelete(req.params.id);
    res.send("Employee deleted...");
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  add,
  getAll,
  update,
  remove,
};
