const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");

router.post("/", auth.refresh_token);
router.post("/admin_login", auth.admin_login);

module.exports = router;
