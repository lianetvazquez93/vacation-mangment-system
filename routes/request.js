const { Router } = require("express");

const requestController = require("../controllers/request");

const router = Router();

router.post("/", requestController.create);

router.get("/", requestController.get);

module.exports = router;
