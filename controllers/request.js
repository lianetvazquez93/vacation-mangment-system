const Request = require("../models/request");

const create = async (req, res) => {
  try {
    let newRequest = new Request({
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      employee: req.employee.id,
    });
    await newRequest.save();
    res.status(201).send("Vacations requested...");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const get = async (req, res) => {
  try {
    const requests = await Request.find();
    res.send(requests);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateStatus = async (req, res) => {
  try {
    await Request.findByIdAndUpdate(
      req.body.id,
      { status: req.body.status },
      { omitUndefined: true }
    );
    res.send("Status updated...");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateDates = async (req, res) => {
  try {
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
    res.status(400).send(error.message);
  }
};

const remove = async (req, res) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.send("Vacations request cancelled...");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  create,
  get,
  updateStatus,
  updateDates,
  remove,
};
