const Request = require("../models/request");
const { BadRequestError, ResourceNotFoundError, ForbiddenError } = require("../lib/errors");

const create = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
      throw new BadRequestError();
    }

    const newRequest = new Request({
      startDate,
      endDate,
      employee: req.employee.id,
    });
    await newRequest.save();
    res.status(201).json(newRequest);
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
    const status = req.body.status;
    const id = req.params.id;

    if (req.employee.role !== "admin") {
      throw new ForbiddenError();
    }

    if (!status) {
      throw new BadRequestError();
    }

    const requestToUpdate = await Request.findById(id);

    if (!requestToUpdate) {
      throw new ResourceNotFoundError();
    }

    requestToUpdate.status = status;
    await requestToUpdate.save();
    res.json(requestToUpdate);
  } catch (error) {
    res.status(error.statusCode).send(error.message);
  }
};

const updateDates = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const id = req.params.id;

    if (!startDate && !endDate) {
      throw new BadRequestError();
    }

    const requestToUpdate = await Request.findById(id);

    if (!requestToUpdate) {
      throw new ResourceNotFoundError();
    }

    if (requestToUpdate.status === "requested" || requestToUpdate.status === "denied") {
      if (requestToUpdate.employee.toString() !== req.employee.id) {
        throw new ForbiddenError();
      }
      if (startDate) {
        requestToUpdate.startDate = startDate;
      }
      if (endDate) {
        requestToUpdate.endDate = endDate;
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
        id,
        {
          startDate,
          endDate,
        },
        { omitUndefined: true }
      );
      const request = await Request.findById(id);
      await request.save();
    }

    res.json(await Request.findById(id));
  } catch (error) {
    res.status(error.statusCode).send(error.message);
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const requestToDelete = await Request.findById(id);

    if (!requestToDelete || requestToDelete.employee.toString() !== req.employee.id) {
      throw new ResourceNotFoundError();
    }

    await Request.findByIdAndDelete(id);
    res.send(await Request.find({ employee: req.employee.id }));
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
