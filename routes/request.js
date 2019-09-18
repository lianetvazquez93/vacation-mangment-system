const { Router } = require("express");

const requestController = require("../controllers/request");

const router = Router();

router.post("/", requestController.create);

router.get("/", requestController.get);

router.put("/status", requestController.updateStatus);

router.put("/dates", requestController.updateDates);

module.exports = router;
