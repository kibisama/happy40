const express = require("express");
const router = express.Router();
const branch = require("../controllers/branch");

router.get("/", branch.getBranches);

module.exports = router;
