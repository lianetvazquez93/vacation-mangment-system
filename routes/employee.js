const { Router } = require("express");

const employeeController = require("../controllers/employee");

const router = Router();

router.post("/", employeeController.add);

router.put("/", employeeController.update);

router.delete("/:id", employeeController.remove);

module.exports = router;
