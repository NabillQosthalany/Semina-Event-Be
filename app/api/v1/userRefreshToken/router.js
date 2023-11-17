const express = require("express");
const { index } = require("./controller");
const router = express();

router.get("/:refreshToken", index);

module.exports = router;
