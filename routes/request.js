const { Router } = require("express");

const requestController = require("../controllers/request");
const { isAuthenticated } = require("../middleware");

const router = Router();

router.post("/", isAuthenticated, requestController.create);

router.get("/", isAuthenticated, requestController.get);

router.put("/status", requestController.updateStatus);

router.put("/dates", requestController.updateDates);

router.delete("/:id", requestController.remove);

module.exports = router;
