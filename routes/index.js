const { Router } = require("express");

const employeeRoutes = require("./employee");
const requestRoutes = require("./request");
const authRoutes = require("./auth");

const router = Router();

router.use("/employees", employeeRoutes);
router.use("/requests", requestRoutes);
router.use("/auth", authRoutes);

module.exports = router;
