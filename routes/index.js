const { Router } = require("express");

const employeeRoutes = require("./employee");

const router = Router();

router.use("/employees", employeeRoutes);

module.exports = router;
