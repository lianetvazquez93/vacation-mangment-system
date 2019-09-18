const { Router } = require("express");

const employeeRoutes = require("./employee");
const requestRoutes = require("./request");

const router = Router();

router.use("/employees", employeeRoutes);
router.use("/requests", requestRoutes);

module.exports = router;
