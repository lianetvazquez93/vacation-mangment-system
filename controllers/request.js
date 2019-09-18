const Request = require("../models/request");

const create = async (req, res) => {
  try {
    let newRequest = new Request({
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    });
    newRequest.save();
    res.send("Vacations requested...");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  create,
};
