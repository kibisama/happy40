const express = require("express");
const router = express.Router();
const room = require("../../controllers/admin/room");

router.post("/", room.postRoom);

module.exports = router;
