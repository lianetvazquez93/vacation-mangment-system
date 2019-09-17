const { Router } = require("express");

const employeeController = require("../controllers/employee");

const router = Router();

router.post("/", employeeController.add);

module.exports = router;
