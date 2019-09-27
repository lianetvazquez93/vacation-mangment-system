const { Router } = require("express");

const requestController = require("../controllers/request");
const { isAuthenticated } = require("../middleware");

const router = Router();

router.post("/", isAuthenticated, requestController.create);

router.get("/", requestController.get);

router.put("/status", isAuthenticated, requestController.updateStatus);

router.put("/dates", isAuthenticated, requestController.updateDates);

router.delete("/:id", isAuthenticated, requestController.remove);

module.exports = router;
