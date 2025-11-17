const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");

router.post("/", auth.refresh_token);
router.post("/admin_login", auth.admin_login);
router.post("/email_validity_checks", auth.email_validity_checks);
// router.post("/join", join);
// router.post("/login", login);

module.exports = router;
