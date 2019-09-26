const { Router } = require("express");

const employeeController = require("../controllers/employee");
const { isAuthenticated } = require("../middleware");

const router = Router();

router.post("/", isAuthenticated, employeeController.add);

router.get("/", isAuthenticated, employeeController.getAll);

router.put("/", employeeController.update);

router.delete("/:id", isAuthenticated, employeeController.remove);

module.exports = router;
