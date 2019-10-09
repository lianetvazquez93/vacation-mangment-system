const Request = require("../models/request");
const { BadRequestError, ResourceNotFoundError, ForbiddenError } = require("../lib/errors");

const create = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
      throw new BadRequestError();
    }

    const newRequest = new Request({
      startDate: startDate,
      endDate: endDate,
      employee: req.employee.id,
    });
    await newRequest.save();
    res.status(201).send("Vacations requested...");
  } catch (error) {
    res.status(error.statusCode).send(error.message);
  }
};

const get = async (req, res) => {
  try {
    const { id } = req.query;

    let requests = id ? await Request.find({ employee: id }) : await Request.find();

    res.send(requests);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateStatus = async (req, res) => {
  try {
    if (req.employee.role !== "admin") {
      throw new ForbiddenError();
    }

    if (!req.body.id || !req.body.status) {
      throw new BadRequestError();
    }

    const requestToUpdate = await Request.findById(req.body.id);

    if (!requestToUpdate) {
      throw new ResourceNotFoundError();
    }

    requestToUpdate.status = req.body.status;
    await requestToUpdate.save();
    res.send("Status updated...");
  } catch (error) {
    res.status(error.statusCode).send(error.message);
  }
};

const updateDates = async (req, res) => {
  try {
    if (!req.body.id || (!req.body.startDate && !req.body.endDate)) {
      throw new BadRequestError();
    }

    const requestToUpdate = await Request.findById(req.body.id);

    if (!requestToUpdate) {
      throw new ResourceNotFoundError();
    }

    if (requestToUpdate.status === "requested" || requestToUpdate.status === "denied") {
      if (requestToUpdate.employee.toString() !== req.employee.id) {
        throw new ForbiddenError();
      }
      if (req.body.startDate) {
        requestToUpdate.startDate = req.body.startDate;
      }
      if (req.body.endDate) {
        requestToUpdate.endDate = req.body.endDate;
      }
      if (requestToUpdate.status === "denied") {
        requestToUpdate.status = "requested";
      }
      await requestToUpdate.save();
    } else {
      if (req.employee.role !== "admin") {
        throw new ForbiddenError();
      }

      await Request.findByIdAndUpdate(
        req.body.id,
        {
          startDate: req.body.startDate,
          endDate: req.body.endDate,
        },
        { omitUndefined: true }
      );
      const request = await Request.findById(req.body.id);
      await request.save();
    }

    res.send("Dates updated...");
  } catch (error) {
    res.status(error.statusCode).send(error.message);
  }
};

const remove = async (req, res) => {
  try {
    const requestToDelete = await Request.findById(req.params.id);

    if (!requestToDelete || requestToDelete.employee.toString() !== req.employee.id) {
      throw new ResourceNotFoundError();
    }

    await Request.findByIdAndDelete(req.params.id);
    res.send("Vacations request cancelled...");
  } catch (error) {
    res.status(error.statusCode).send(error.message);
  }
};

module.exports = {
  create,
  get,
  updateStatus,
  updateDates,
  remove,
};
