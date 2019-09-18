const Request = require("../models/request");

const create = async (req, res) => {
  try {
    let newRequest = new Request({
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    });
    await newRequest.save();
    res.send("Vacations requested...");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const get = async (req, res) => {
  try {
    let requests = await Request.find();
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

module.exports = {
  create,
  get,
  updateStatus,
  updateDates,
};
