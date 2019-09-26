const { Router } = require("express");

const employeeController = require("../controllers/employee");
const { isAuthenticated } = require("../middleware");

const router = Router();

router.post("/", isAuthenticated, employeeController.add);

router.put("/", employeeController.update);

router.delete("/:id", employeeController.remove);

module.exports = router;
