const { Router } = require("express");

const employeeController = require("../controllers/employee");
const { isAuthenticated } = require("../lib/middleware");

const router = Router();

router.post("/", isAuthenticated, employeeController.add);

router.get("/", isAuthenticated, employeeController.getAll);

router.put("/", isAuthenticated, employeeController.update);

router.delete("/:id", isAuthenticated, employeeController.remove);

module.exports = router;
