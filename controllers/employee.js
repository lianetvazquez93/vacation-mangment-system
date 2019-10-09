const Employee = require("../models/employee");
const { ForbiddenError, ResourceNotFoundError } = require("../lib/errors");

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
    res.status(201).json(newEmployee);
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

    const id = req.params.id;
    const employeeToUpdate = await Employee.findById(id);

    if (!employeeToUpdate) {
      throw new ResourceNotFoundError();
    }

    if (req.body.totalDays) {
      const available = employeeToUpdate.availableDays;
      const total = employeeToUpdate.totalDays;
      await Employee.findByIdAndUpdate(
        id,
        { availableDays: available + req.body.totalDays - total },
        { omitUndefined: true }
      );
    }

    if (req.body.password) {
      employeeToUpdate.password = req.body.password;
      await employeeToUpdate.save();
    }

    await Employee.findByIdAndUpdate(
      id,
      {
        fullName: req.body.fullName,
        email: req.body.email,
        department: req.body.department,
        role: req.body.role,
        totalDays: req.body.totalDays,
      },
      { omitUndefined: true }
    );

    res.json(await Employee.findById(id));
  } catch (error) {
    res.status(error.statusCode).send(error.message);
  }
};

const remove = async (req, res) => {
  try {
    if (req.employee.role !== "admin") {
      throw new ForbiddenError();
    }

    const id = req.params.id;
    const employeeToDelete = await Employee.findById(id);

    if (!employeeToDelete) {
      throw new ResourceNotFoundError();
    }

    await Employee.findByIdAndDelete(id);
    res.send(await Employee.find());
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
