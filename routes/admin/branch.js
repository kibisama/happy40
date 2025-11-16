const express = require("express");
const router = express.Router();
const branch = require("../../controllers/admin/branch");

router.post("/", branch.postBranch);

module.exports = router;
