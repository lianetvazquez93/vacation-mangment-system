const { Router } = require("express");

const authController = require("../controllers/auth");
const { isAuthenticated } = require("../lib/middleware");
const router = Router();

router.post("/login", authController.login);

router.get("/profile", isAuthenticated, authController.profile);

module.exports = router;
