const Request = require("../models/request");

const create = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const newRequest = new Request({
      startDate: startDate,
      endDate: endDate,
      employee: req.employee.id,
    });
    await newRequest.save();
    res.status(201).send("Vacations requested...");
  } catch (error) {
    res.send(error.message);
  }
};

const get = async (req, res) => {
  try {
    const { id } = req.query;
    let requests = [];

    if (id) {
      requests = await Request.find({ employee: id });
    } else {
      requests = await Request.find();
    }

    res.send(requests);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateStatus = async (req, res) => {
  try {
    if (req.employee.role !== "admin") {
      res.status(401);
      throw new Error("No authorization");
    }

    await Request.findByIdAndUpdate(
      req.body.id,
      { status: req.body.status },
      { omitUndefined: true }
    );
    res.send("Status updated...");
  } catch (error) {
    res.send(error.message);
  }
};

const updateDates = async (req, res) => {
  try {
    const requestToUpdate = await Request.findById(req.body.id);

    if (!requestToUpdate || requestToUpdate.employee != req.employee.id) {
      res.status(404);
      throw new Error("Request does not exist");
    }

    await Request.findByIdAndUpdate(
      req.body.id,
      {
        startDate: req.body.startDate,
        endDate: req.body.endDate,
      },
      { omitUndefined: true }
    );
    res.send("Dates updated...");
  } catch (error) {
    res.send(error.message);
  }
};

const remove = async (req, res) => {
  try {
    const requestToDelete = await Request.findById(req.params.id);

    if (!requestToDelete || requestToDelete.employee != req.employee.id) {
      res.status(404);
      throw new Error("Request does not exist");
    }

    await Request.findByIdAndDelete(req.params.id);
    res.send("Vacations request cancelled...");
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  create,
  get,
  updateStatus,
  updateDates,
  remove,
};
