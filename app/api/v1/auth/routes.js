const express = require("express");
const { signInCms } = require("./controller");
const router = express();
router.post("/", signInCms);

module.exports = router;
