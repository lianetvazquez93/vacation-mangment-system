const Employee = require("../models/employee");
const { ForbiddenError, BadRequestError, ResourceNotFoundError } = require("../lib/errors");

const add = async (req, res) => {
  try {
    if (req.employee.role !== "admin") {
      throw new ForbiddenError();
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
    res.status(error.statusCode).send(error.message);
  }
};

const getAll = async (req, res) => {
  try {
    if (req.employee.role !== "admin") {
      throw new ForbiddenError();
    }

    const employees = await Employee.find();
    res.send(employees);
  } catch (error) {
    res.status(error.statusCode).send(error.message);
  }
};

const update = async (req, res) => {
  try {
    if (req.employee.role !== "admin") {
      throw new ForbiddenError();
    }

    if (!req.body.id) {
      throw new BadRequestError();
    }

    const employeeToUpdate = await Employee.findById(req.body.id);

    if (!employeeToUpdate) {
      throw new ResourceNotFoundError();
    }

    if (req.body.totalDays) {
      employeeToUpdate.availableDays += req.body.totalDays - employeeToUpdate.totalDays;
      await employeeToUpdate.save();
    }

    if (req.body.password) {
      employeeToUpdate.password = req.body.password;
      await employeeToUpdate.save();
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
    res.status(error.statusCode).send(error.message);
  }
};

const remove = async (req, res) => {
  try {
    if (req.employee.role !== "admin") {
      throw new ForbiddenError();
    }

    const employeeToDelete = await Employee.findById(req.params.id);

    if (!employeeToDelete) {
      throw new ResourceNotFoundError();
    }

    await Employee.findByIdAndDelete(req.params.id);
    res.send("Employee deleted...");
  } catch (error) {
    res.status(error.statusCode).send(error.message);
  }
};

module.exports = {
  add,
  getAll,
  update,
  remove,
};
