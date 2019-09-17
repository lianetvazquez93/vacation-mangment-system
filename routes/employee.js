const { Router } = require("express");

const employeeController = require("../controllers/employee");

const router = Router();

router.post("/", employeeController.add);

router.get("/", employeeController.get);

module.exports = router;
