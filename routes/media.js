var express = require("express");
var router = express.Router();

const mediaController = require("../app/controllers/MediaController");

/* GET media listing. */
router.post("/", mediaController.store);

module.exports = router;
